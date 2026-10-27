"""Download real preview media from GitHub READMEs, repo paths, and optional live captures."""
from __future__ import annotations

import base64
import json
import re
import shutil
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS_TS = ROOT / "src" / "data" / "projects.ts"
META_TS = ROOT / "src" / "data" / "projectMeta.ts"
CACHE = ROOT / "scripts" / "media_cache"
OUT_MANIFEST = ROOT / "scripts" / "media_manifest.json"
PUBLIC = ROOT / "public" / "projects"
REPO_ROOT = ROOT.parent

UA = "deployed-portfolio-preview-harvest/1.0"
BRANCHES = ("main", "master")
IMAGE_EXT = (".gif", ".webp", ".png", ".jpg", ".jpeg", ".mp4", ".webm")

# Known demo paths (relative to repo root) when README omits them
EXTRA_PATHS: dict[str, list[str]] = {
    "ledgeriq": ["docs/assets/demo.gif"],
    "invoiceflow-ai": ["docs/demo.gif", "assets/demo.gif", "public/demo.gif"],
    "healthcare-assistant": ["assets/demo.gif", "docs/demo.gif"],
    "paperloom": ["docs/demo.gif", "public/demo.gif"],
    "neuralfolio": ["assets/performance.png", "docs/architecture.png"],
    "logisticshub": [
        "qlik/portfolio/previews/parcelpulse-network-intelligence-executive.png",
    ],
}

ctx = ssl.create_default_context()


def sanitize_url(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    path = urllib.parse.quote(urllib.parse.unquote(parts.path), safe="/:@")
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, path, parts.query, parts.fragment))


def http_get(url: str, timeout: int = 45) -> bytes | None:
    url = sanitize_url(url)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            return resp.read()
    except (urllib.error.URLError, TimeoutError, OSError):
        return None


def is_lfs_pointer(data: bytes) -> bool:
    if len(data) > 400:
        return False
    try:
        return b"git-lfs" in data[:120]
    except OSError:
        return False


def parse_projects() -> list[dict]:
    text = PROJECTS_TS.read_text(encoding="utf-8")
    blocks = re.split(r"\n  \{\n", text)
    projects: list[dict] = []
    for block in blocks[1:]:
        pid = re.search(r"id: '([^']+)'", block)
        if not pid:
            continue
        gh = re.search(r"githubUrl:\s*'([^']+)'", block) or re.search(
            r"githubUrl:\s*\n\s*'([^']+)'", block
        )
        live = re.search(r"liveUrl:\s*'([^']+)'", block) or re.search(
            r"liveUrl:\s*\n\s*'([^']+)'", block
        )
        name = re.search(r"name: '([^']+)'", block)
        projects.append(
            {
                "id": pid.group(1),
                "name": name.group(1) if name else pid.group(1),
                "githubUrl": gh.group(1) if gh else None,
                "liveUrl": live.group(1) if live else None,
            }
        )
    return projects


def live_verified(pid: str) -> bool:
    if not META_TS.is_file():
        return False
    meta = META_TS.read_text(encoding="utf-8")
    m = re.search(rf"{re.escape(pid)}:[\s\S]*?liveVerified:\s*(true|false)", meta)
    return bool(m and m.group(1) == "true")


def github_parts_fixed(url: str | None) -> tuple[str, str] | None:
    if not url:
        return None
    m = re.search(r"github\.com/([^/]+)/([^/#?]+)", url)
    if not m:
        return None
    return m.group(1), m.group(2).strip().rstrip("/")


def fetch_readme_api(owner: str, repo: str) -> tuple[str, str] | None:
    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "application/vnd.github+json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        content = base64.b64decode(data["content"]).decode("utf-8", errors="replace")
        branch = data.get("branch") or "main"
        return content, branch
    except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError, KeyError):
        return None


def fetch_readme_raw(owner: str, repo: str) -> tuple[str, str] | None:
    for branch in BRANCHES:
        for name in ("README.md", "readme.md", "Readme.md"):
            url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{name}"
            raw = http_get(url)
            if raw and len(raw) > 50:
                return raw.decode("utf-8", errors="replace"), branch
    return None


def resolve_relative(path: str, owner: str, repo: str, branch: str) -> str:
    path = path.strip().split("?")[0]
    if path.startswith("http://") or path.startswith("https://"):
        return path
    if path.startswith("//"):
        return "https:" + path
    if path.startswith("/"):
        return f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}{path}"
    clean = path.lstrip("./")
    return f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{clean}"


def extract_urls(readme: str, owner: str, repo: str, branch: str) -> list[str]:
    urls: list[str] = []
    for m in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", readme):
        urls.append(m.group(1).strip().strip('"'))

    for m in re.finditer(r'<img[^>]+src=["\']([^"\']+)["\']', readme, re.I):
        urls.append(m.group(1).strip())

    for m in re.finditer(
        r"https?://[^\s)\>'\"]+\.(?:gif|webp|png|jpe?g|mp4|webm)(?:\?[^\s)\>'\"]*)?",
        readme,
        re.I,
    ):
        urls.append(m.group(0))

    resolved: list[str] = []
    seen: set[str] = set()
    for u in urls:
        full = resolve_relative(u, owner, repo, branch)
        if full not in seen:
            seen.add(full)
            resolved.append(full)
    return resolved


def is_junk_media_url(url: str) -> bool:
    low = url.lower()
    return (
        "shields.io" in low
        or "img.shields" in low
        or "badge" in low and "githubusercontent" not in low
        or "capsule-render.vercel.app" in low
        or "komarev.com" in low
    )


def score_media_url(url: str) -> int:
    low = url.lower()
    if is_junk_media_url(url):
        return 0
    if low.endswith(".gif"):
        return 100
    if low.endswith(".webm") or low.endswith(".mp4"):
        return 95
    if "demo" in low or "screen" in low or "recording" in low:
        return 85
    if low.endswith(".webp"):
        return 70
    if low.endswith(".png") or low.endswith(".jpg") or low.endswith(".jpeg"):
        return 55
    if "badge" in low or "shields.io" in low or "img.shields" in low:
        return 5
    if low.endswith(".svg"):
        return 15
    return 20


def local_repo_media(pid: str, github_url: str | None) -> list[Path]:
    found: list[Path] = []
    parts = github_parts_fixed(github_url)
    if not parts:
        return found
    _owner, repo_name = parts
    candidates = [
        REPO_ROOT / repo_name,
        REPO_ROOT / repo_name.lower(),
        REPO_ROOT / pid,
    ]
    for root in candidates:
        if not root.is_dir():
            continue
        for pattern in ("**/*.gif", "**/demo.*", "**/assets/**/*.png", "**/docs/**/*.png"):
            for p in root.glob(pattern):
                if p.is_file() and not is_lfs_pointer(p.read_bytes()[:200]):
                    found.append(p)
        break
    return found


def download_to(path: Path, url: str) -> bool:
    data = http_get(url)
    if not data or is_lfs_pointer(data):
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return True


def try_extra_paths(owner: str, repo: str, pid: str, dest_dir: Path) -> dict | None:
    for branch in BRANCHES:
        for rel in EXTRA_PATHS.get(pid, []):
            url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{rel}"
            ext = Path(rel).suffix or ".bin"
            dest = dest_dir / f"extra_{Path(rel).name}"
            if download_to(dest, url):
                return {"file": str(dest), "source": "repo_path", "url": url}
    return None


def og_image_url(owner: str, repo: str) -> str:
    return f"https://opengraph.githubassets.com/1/{owner}/{repo}"


def harvest_one(project: dict) -> dict:
    pid = project["id"]
    dest_dir = CACHE / pid
    dest_dir.mkdir(parents=True, exist_ok=True)
    result: dict = {"id": pid, "assets": [], "chosen": None}

    parts = github_parts_fixed(project.get("githubUrl"))
    if parts:
        owner, repo = parts
        readme = fetch_readme_api(owner, repo)
        branch = "main"
        if readme:
            text, branch = readme
        else:
            raw = fetch_readme_raw(owner, repo)
            if raw:
                text, branch = raw
            else:
                text = ""

        urls = extract_urls(text, owner, repo, branch) if text else []
        urls.sort(key=score_media_url, reverse=True)

        og_dest = dest_dir / "github_og.jpg"
        if download_to(og_dest, og_image_url(owner, repo)):
            result["assets"].append(
                {"file": str(og_dest), "source": "github_og", "url": og_image_url(owner, repo)}
            )

        for i, url in enumerate(urls[:12]):
            if is_junk_media_url(url):
                continue
            ext = Path(url.split("?")[0]).suffix.lower() or ".bin"
            if ext not in IMAGE_EXT and ext != ".bin":
                continue
            dest = dest_dir / f"readme_{i}{ext}"
            if download_to(dest, url):
                result["assets"].append({"file": str(dest), "source": "readme", "url": url})

        extra = try_extra_paths(owner, repo, pid, dest_dir)
        if extra:
            result["assets"].append(extra)

    for lp in local_repo_media(pid, project.get("githubUrl"))[:5]:
        dest = dest_dir / lp.name
        if not dest.exists():
            try:
                shutil.copy2(lp, dest)
                result["assets"].append({"file": str(dest), "source": "local_clone", "url": str(lp)})
            except OSError:
                pass

    # Pick best asset
    def asset_score(a: dict) -> int:
        p = Path(a["file"])
        if not p.is_file():
            return -1
        ext = p.suffix.lower()
        base = score_media_url(p.name)
        if a["source"] == "repo_path":
            base += 10
        if a["source"] == "readme" and ext == ".gif":
            base += 5
        if a["source"] == "github_og":
            base = 40
        url = a.get("url", "")
        if is_junk_media_url(url) or p.suffix.lower() == ".bin":
            return -1
        try:
            if p.stat().st_size < 800:
                return -1
        except OSError:
            return -1
        return base

    ranked = sorted(result["assets"], key=asset_score, reverse=True)
    if ranked and asset_score(ranked[0]) > 0:
        result["chosen"] = ranked[0]
    result["liveUrl"] = project.get("liveUrl")
    result["liveCapture"] = live_verified(pid) and bool(project.get("liveUrl"))
    return result


def main() -> None:
    projects = parse_projects()
    manifest: dict[str, dict] = {}
    for i, p in enumerate(projects):
        print(f"[{i+1}/{len(projects)}] {p['id']}...")
        manifest[p["id"]] = harvest_one(p)
        time.sleep(0.35)

    OUT_MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    chosen = sum(1 for v in manifest.values() if v.get("chosen"))
    print(f"Wrote {OUT_MANIFEST} — {chosen}/{len(projects)} with media")


if __name__ == "__main__":
    main()
