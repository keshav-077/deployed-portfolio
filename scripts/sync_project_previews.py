"""Copy repo demo GIFs and generate coastal preview art for other projects."""
from __future__ import annotations

import hashlib
import json
import math
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
PROMPT_MANIFEST = ROOT / "scripts" / "portfolio_visual_prompts.json"
SKIP_GENERIC = set()
if PROMPT_MANIFEST.is_file():
    SKIP_GENERIC = set(json.loads(PROMPT_MANIFEST.read_text(encoding="utf-8"))["projects"].keys())
SKIP_GENERIC |= {
    "intelligent-vehicle-recognition-alpr",
    "ai-border-security",
    "aeroscale-sr",
}

from doc36_common import PUBLIC, ffmpeg_bin

W, H = 1280, 720
PROJECTS_TS = ROOT / "src" / "data" / "projects.ts"

REPO_GIFS: dict[str, Path] = {
    "healthcare-assistant": Path(r"C:\Github-all-repos\medical-chatbot-rag\docs\demo.gif"),
    "paperloom": Path(
        r"C:\Github-all-repos\trace-research-paper-studio\docs\images\demo.gif"
    ),
    "ledgeriq": Path(
        r"C:\Github-all-repos\Ledgeriq----Agentic-B2B-financial-reconciliation\docs\assets\demo.gif"
    ),
}

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    raise SystemExit("pip install Pillow")

C = {
    "navy": (28, 43, 54),
    "cream": (246, 242, 238),
    "accent": (200, 70, 42),
    "teal": (45, 138, 158),
    "muted": (97, 122, 138),
    "white": (255, 255, 255),
}


def parse_projects_ts() -> list[dict]:
    text = PROJECTS_TS.read_text(encoding="utf-8")
    blocks = re.split(r"\n  \{\n", text)
    out: list[dict] = []
    for block in blocks[1:]:
        mid = re.search(r"id: '([^']+)'", block)
        if not mid:
            continue
        name = re.search(r"name: '([^']+)'", block)
        cat = re.search(r"category: '([^']+)'", block)
        tech: list[str] = []
        if "techStack:" in block:
            chunk = block.split("techStack:")[1].split("],")[0]
            tech = re.findall(r"'([^']+)'", chunk)[:8]
        out.append(
            {
                "id": mid.group(1),
                "name": name.group(1) if name else mid.group(1),
                "category": cat.group(1) if cat else "",
                "techStack": tech,
            }
        )
    return out


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    name = "segoeuib.ttf" if bold else "segoeui.ttf"
    for path in (f"C:/Windows/Fonts/{name}", "C:/Windows/Fonts/arial.ttf"):
        p = Path(path)
        if p.is_file():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                pass
    return ImageFont.load_default()


def theme_key(category: str) -> str:
    c = category.lower()
    if "computer vision" in c:
        return "cv"
    if "generative" in c:
        return "gen"
    if "llm" in c or "rag" in c:
        return "rag"
    if "reinforcement" in c:
        return "rl"
    if "nlp" in c:
        return "nlp"
    if "cloud" in c or "distributed" in c:
        return "cloud"
    if "desktop" in c:
        return "app"
    return "ml"


def accent_for_id(pid: str) -> tuple[int, int, int]:
    h = hashlib.sha256(pid.encode()).digest()
    hue = h[0] / 255.0
    r = int(C["teal"][0] * (1 - hue) + C["accent"][0] * hue)
    g = int(C["teal"][1] * (1 - hue) + C["accent"][1] * hue)
    b = int(C["teal"][2] * (1 - hue) + C["accent"][2] * hue)
    return (r, g, b)


def draw_motif(draw: ImageDraw.ImageDraw, theme: str, t: float, accent: tuple[int, int, int]) -> None:
    if theme == "cv":
        draw.rectangle((90, 220, 250, 340), outline=accent, width=4)
        draw.rectangle((320, 200, 520, 360), outline=C["teal"], width=2)
    elif theme == "gen":
        for i in range(4):
            for j in range(5):
                s = 22 + (i + j) % 3 * 6
                x = 80 + j * 115
                y = 210 + i * 38
                col = accent if (i + j) % 2 == 0 else C["teal"]
                draw.rounded_rectangle((x, y, x + s, y + s), radius=4, fill=col)
    elif theme == "rag":
        draw.rounded_rectangle((70, 220, 340, 300), radius=14, fill=C["white"], outline=C["navy"])
        draw.rounded_rectangle((300, 260, W - 70, 340), radius=14, fill=accent)
    elif theme == "rl":
        for i in range(6):
            h = 35 + int(45 * abs(math.sin(t + i * 0.6)))
            draw.rectangle((100 + i * 85, 360 - h, 130 + i * 85, 360), fill=C["teal"])
    elif theme == "nlp":
        draw.rounded_rectangle((80, 230, 280, 320), fill=C["white"], outline=C["navy"])
        draw.polygon([(300, 275), (340, 295), (300, 315)], fill=accent)
    elif theme == "cloud":
        for i, (x, y) in enumerate([(100, 250), (320, 230), (540, 260)]):
            draw.ellipse((x, y, x + 70, y + 45), fill=accent if i == 1 else C["white"], outline=C["navy"])
    elif theme == "app":
        draw.rounded_rectangle((W // 2 - 120, 220, W // 2 + 120, 360), radius=8, outline=accent, width=3)
    else:
        draw.ellipse((W // 2 - 90, 230, W // 2 + 90, 370), outline=C["teal"], width=3)


def render_card(meta: dict) -> Image.Image:
    pid = meta["id"]
    theme = theme_key(meta.get("category", ""))
    accent = accent_for_id(pid)
    t = (int(hashlib.md5(pid.encode()).hexdigest()[:4], 16) % 100) / 100.0
    img = Image.new("RGB", (W, H), C["cream"])
    draw = ImageDraw.Draw(img)
    for y in range(H):
        u = y / H + 0.03 * math.sin(t * 6.28 + y * 0.015)
        r = int(C["navy"][0] * (1 - u) + C["cream"][0] * u)
        g = int(C["navy"][1] * (1 - u) + C["cream"][1] * u)
        b = int(C["navy"][2] * (1 - u) + C["cream"][2] * u)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    draw.rectangle((0, 0, W, 6), fill=accent)
    draw_motif(draw, theme, t * 3, accent)
    draw.text((40, 48), meta["name"][:46], font=_font(32, True), fill=C["navy"])
    draw.text((40, 92), meta.get("category", "")[:40], font=_font(13), fill=C["teal"])
    x = 40
    for chip in meta.get("techStack", [])[:4]:
        tw = int(draw.textlength(chip, font=_font(11))) + 24
        draw.rounded_rectangle((x, 130, x + tw, 158), radius=4, fill=accent)
        draw.text((x + 12, 136), chip[:18], font=_font(11), fill=C["white"])
        x += tw + 10
    return img


def gif_to_poster(gif: Path, poster: Path) -> None:
    tmp = poster.parent / "_gif_frame.png"
    subprocess.run(
        [ffmpeg_bin(), "-y", "-i", str(gif), "-vframes", "1", str(tmp)],
        capture_output=True,
        check=False,
    )
    if tmp.is_file():
        Image.open(tmp).convert("RGB").save(poster, quality=92)
        tmp.unlink(missing_ok=True)


def main() -> None:
    projects = parse_projects_ts()
    manifest = {}
    for p in projects:
        pid = p["id"]
        out_dir = PUBLIC / pid
        out_dir.mkdir(parents=True, exist_ok=True)
        if pid in REPO_GIFS and REPO_GIFS[pid].is_file():
            gif_dest = out_dir / "preview.gif"
            shutil.copy2(REPO_GIFS[pid], gif_dest)
            poster = out_dir / "poster.jpg"
            gif_to_poster(gif_dest, poster)
            manifest[pid] = {"previewSrc": f"/projects/{pid}/preview.gif", "source": "repo-gif"}
            print(f"{pid}: repo demo.gif")
            continue
        if pid in SKIP_GENERIC:
            print(f"{pid}: skip (prompt preview in preview_assets/generated)")
            continue
        card = render_card(p)
        jpg = out_dir / "preview.jpg"
        card.save(jpg, quality=92)
        poster = out_dir / "poster.jpg"
        card.save(poster, quality=92)
        manifest[pid] = {"previewSrc": f"/projects/{pid}/preview.jpg", "source": "generated"}
        print(f"{pid}: generated preview.jpg")

    (ROOT / "scripts" / "preview_assets_manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )

    import subprocess

    hud = ROOT / "scripts" / "render_product_hud_previews.py"
    if hud.is_file():
        subprocess.run([sys.executable, str(hud)], check=False)

    print(f"Done — {len(projects)} projects")


if __name__ == "__main__":
    main()
