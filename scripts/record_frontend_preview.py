"""Record product walkthrough MP4 for a doc-36 UI project."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import argparse
import socket
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path

from doc36_common import (
    OUT_H,
    OUT_W,
    PUBLIC,
    entry_by_id,
    parse_live_urls,
    poster_from_mp4,
    repo_path,
    transcode_webm_to_mp4,
)

ROOT = Path(__file__).resolve().parents[1]
PROFILE = ROOT / "scripts" / "doc36_ui_profile.json"


def load_profile(pid: str) -> dict | None:
    import json

    if not PROFILE.is_file():
        return None
    for p in json.loads(PROFILE.read_text(encoding="utf-8")):
        if p["portfolioId"] == pid:
            return p
    return None


def url_ready(url: str, timeout: float = 90.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "doc36/1"})
            urllib.request.urlopen(req, timeout=5)
            return True
        except (urllib.error.URLError, OSError):
            try:
                urllib.request.urlopen(
                    urllib.request.Request(url, headers={"User-Agent": "doc36/1"}),
                    timeout=5,
                )
                return True
            except (urllib.error.URLError, OSError):
                time.sleep(1.5)
    return False


def pick_record_url(profile: dict, live_urls: dict[str, str]) -> tuple[str, str]:
    pid = profile["portfolioId"]
    live = profile.get("liveUrl") or live_urls.get(pid)
    if live and profile.get("preferLive", True):
        if url_ready(live, timeout=25):
            return live, "live_record"
    if profile.get("baseUrl"):
        return profile["baseUrl"].rstrip("/") + (profile.get("readyPath") or "/"), "frontend_record"
    if live:
        return live, "live_record"
    raise RuntimeError(f"No reachable URL for {pid}")


def run_tour(page, url: str) -> None:
    page.goto(url, wait_until="domcontentloaded", timeout=120000)
    page.wait_for_timeout(2000)
    for y in (0, 400, 800, 1200, 0):
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(1800)
    page.mouse.move(640, 360)
    page.wait_for_timeout(800)


def record_with_playwright(url: str, out_mp4: Path) -> None:
    from playwright.sync_api import sync_playwright

    tmp = out_mp4.parent / "_video_tmp"
    tmp.mkdir(parents=True, exist_ok=True)
    for old in tmp.glob("*.webm"):
        old.unlink()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir=str(tmp),
            viewport={"width": 1280, "height": 720},
            color_scheme="light",
        )
        page = context.new_page()
        run_tour(page, url)
        context.close()
        browser.close()

    webms = list(tmp.glob("*.webm"))
    if not webms:
        raise RuntimeError("Playwright did not produce a webm recording")
    transcode_webm_to_mp4(webms[-1], out_mp4)


def maybe_start_server(profile: dict, entry: dict) -> subprocess.Popen | None:
    if profile.get("preferLive") and profile.get("liveUrl"):
        if url_ready(profile["liveUrl"], timeout=15):
            return None
    kind = profile.get("kind", "none")
    if kind == "none" or not profile.get("startCommand"):
        return None
    base = repo_path(entry)
    cwd_name = profile.get("cwd", ".")
    cwd = base / cwd_name if cwd_name != "." else base
    if not cwd.is_dir():
        return None
    cmd = profile["startCommand"]
    env = None
    proc = subprocess.Popen(
        cmd,
        shell=True,
        cwd=str(cwd),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if hasattr(subprocess, "CREATE_NEW_PROCESS_GROUP") else 0,
    )
    base_url = profile.get("baseUrl", "http://127.0.0.1:5173")
    path = profile.get("readyPath", "/")
    if not url_ready(base_url.rstrip("/") + path, timeout=120):
        proc.terminate()
        raise RuntimeError(f"Server did not become ready: {base_url}")
    return proc


def record_project(portfolio_id: str) -> dict:
    entry = entry_by_id(portfolio_id)
    if not entry:
        raise SystemExit(f"Unknown id: {portfolio_id}")
    profile = load_profile(portfolio_id)
    if not profile or profile.get("kind") == "none":
        raise RuntimeError(f"{portfolio_id} is not a UI project")

    live_urls = parse_live_urls()
    out_dir = PUBLIC / portfolio_id
    out_mp4 = out_dir / "preview.mp4"
    poster = out_dir / "poster.jpg"
    report_path = out_dir / "preview_report.json"

    proc = None
    try:
        live = profile.get("liveUrl") or live_urls.get(portfolio_id)
        url, source = None, "frontend_record"
        if live and profile.get("preferLive", True) and url_ready(live, timeout=30):
            url, source = live, "live_record"
        else:
            proc = maybe_start_server(profile, entry)
            url, source = pick_record_url(profile, live_urls)
        record_with_playwright(url, out_mp4)
        poster_from_mp4(out_mp4, poster)
        report = {
            "portfolioId": portfolio_id,
            "source": source,
            "url": url,
            "kind": profile.get("kind"),
        }
        report_path.write_text(__import__("json").dumps(report, indent=2), encoding="utf-8")
        return report
    finally:
        if proc:
            proc.terminate()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--id", required=True)
    args = ap.parse_args()
    rep = record_project(args.id)
    print(f"Recorded {args.id}: {rep['source']} @ {rep['url']}")


if __name__ == "__main__":
    main()
