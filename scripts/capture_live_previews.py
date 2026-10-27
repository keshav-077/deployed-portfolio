"""Capture live demo sites as multi-frame GIFs (Playwright)."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "media_manifest.json"
CACHE = ROOT / "scripts" / "media_cache"

W, H = 1280, 720


def capture_url(url: str, out_pngs: list[Path]) -> bool:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("playwright not installed; skip live capture", file=sys.stderr)
        return False

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": W, "height": H})
            page.goto(url, wait_until="domcontentloaded", timeout=90000)
            page.wait_for_timeout(2500)
            scrolls = [0, 400, 800, 0]
            for i, y in enumerate(scrolls):
                page.evaluate(f"window.scrollTo(0, {y})")
                page.wait_for_timeout(900)
                dest = out_pngs[i]
                dest.parent.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(dest), full_page=False)
            browser.close()
        return all(p.is_file() for p in out_pngs)
    except Exception as exc:
        print(f"capture failed {url}: {exc}", file=sys.stderr)
        return False


def main() -> None:
    if not MANIFEST.is_file():
        print("Run harvest_project_media.py first", file=sys.stderr)
        sys.exit(1)

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for pid, entry in data.items():
        url = entry.get("liveUrl")
        if not url:
            continue
        # Prefer verified live demos; also capture featured production URLs
        if not entry.get("liveCapture") and pid not in (
            "invoiceflow-ai",
            "healthcare-assistant",
            "paperloom",
        ):
            continue
        dest_dir = CACHE / pid / "live"
        frames = [dest_dir / f"frame_{i}.png" for i in range(4)]
        if frames[0].is_file():
            print(f"skip {pid} (live frames exist)")
            continue
        print(f"Capturing {pid} @ {url}")
        if capture_url(url, frames):
            entry["liveFrames"] = [str(p) for p in frames]
            entry["chosen"] = {
                "file": str(frames[0]),
                "source": "live_capture",
                "url": url,
            }

    MANIFEST.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print("Live capture pass done")


if __name__ == "__main__":
    main()
