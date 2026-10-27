"""Realistic camera still + product HUD sidebar previews (ALPR-style)."""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "preview_assets"
PUBLIC = ROOT / "public" / "projects"
W, H = 1280, 720
FEED_W = 860

GREEN = (0, 255, 136)
PANEL = (12, 14, 18)
PANEL_LINE = (40, 48, 56)
WHITE = (245, 247, 250)
MUTED = (140, 150, 165)


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    name = "consolab.ttf" if bold else "consola.ttf"
    for path in (
        f"C:/Windows/Fonts/{name}",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ):
        p = Path(path)
        if p.is_file():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                pass
    return ImageFont.load_default()


def draw_corner_brackets(draw: ImageDraw.ImageDraw, x0: int, y0: int, x1: int, y1: int, col: tuple[int, int, int], L: int = 22) -> None:
    w = 2
    for (xa, ya, xb, yb) in (
        (x0, y0, x0 + L, y0),
        (x0, y0, x0, y0 + L),
        (x1, y0, x1 - L, y0),
        (x1, y0, x1, y0 + L),
        (x0, y1, x0 + L, y1),
        (x0, y1, x0, y1 - L),
        (x1, y1, x1 - L, y1),
        (x1, y1, x1, y1 - L),
    ):
        draw.line([(xa, ya), (xb, yb)], fill=col, width=w)


def _load_feed(name: str) -> Image.Image:
    base_path = ASSETS / name
    if not base_path.is_file():
        raise FileNotFoundError(base_path)
    feed = Image.open(base_path).convert("RGB")
    return feed.resize((FEED_W, H), Image.Resampling.LANCZOS)


def _sidebar_header(draw: ImageDraw.ImageDraw, sx: int, title: str, subtitle: str) -> int:
    draw.rectangle((sx + 20, 24, W - 20, 72), fill=(0, 60, 40))
    draw.text((sx + 36, 32), title, font=_font(14, True), fill=GREEN)
    draw.text((sx + 36, 52), subtitle, font=_font(11), fill=MUTED)
    return 88


def composite_alpr() -> Image.Image:
    ref = ASSETS / "alpr_hud_reference.jpg"
    if ref.is_file():
        return Image.open(ref).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)

    base_path = ASSETS / "alpr_scene_base.jpg"
    if not base_path.is_file():
        raise SystemExit(f"Missing {base_path} or {ref}")
    feed = Image.open(base_path).convert("RGB")
    feed = feed.resize((FEED_W, H), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (W, H), PANEL)
    canvas.paste(feed, (0, 0))
    draw = ImageDraw.Draw(canvas)

    mono = _font(13)
    mono_b = _font(14, True)
    small = _font(11)

    draw.text((24, 18), "CAM 12  |  CHECKPOINT GATE B  |  DUSK", font=mono, fill=WHITE)
    draw.text((FEED_W - 280, 18), "● REC  2026-10-27  18:42:09", font=mono, fill=(255, 80, 80))
    draw.text((24, H - 32), "YOLOv5 plate detector (ONNX)  |  Tesseract OCR", font=small, fill=MUTED)

    # Plate bbox (approximate lower-center of feed)
    bx0, by0, bx1, by1 = 320, 430, 520, 490
    draw.rectangle((bx0, by0, bx1, by1), outline=GREEN, width=3)
    label = "license_plate  0.97"
    tw = int(draw.textlength(label, font=small))
    draw.rectangle((bx0, by0 - 22, bx0 + tw + 12, by0), fill=GREEN)
    draw.text((bx0 + 6, by0 - 20), label, font=small, fill=(0, 40, 20))

    draw_corner_brackets(draw, 16, 12, FEED_W - 16, H - 12, WHITE)

    # Sidebar
    sx = FEED_W
    draw.rectangle((sx, 0, W, H), fill=PANEL)
    draw.line([(sx, 0), (sx, H)], fill=PANEL_LINE, width=2)

    draw.rectangle((sx + 20, 24, W - 20, 72), fill=(0, 60, 40))
    draw.text((sx + 36, 32), "PLATE READ", font=mono_b, fill=GREEN)
    draw.text((sx + 36, 52), "Status: logged", font=small, fill=MUTED)

    draw.rectangle((sx + 20, 88, W - 20, 168), fill=WHITE)
    draw.text((sx + 36, 108), "TS 09 EA 4821", font=_font(28, True), fill=(10, 10, 10))

    lines = [
        ("Detector", "YOLOv5 → ONNX"),
        ("Box confidence", "0.97"),
        ("OCR", "Tesseract oem 3, psm 7"),
        ("Best mAP@0.5", "0.991 (epoch 11)"),
        ("ROI saved", "static/roi_yolo/"),
    ]
    y = 188
    for k, v in lines:
        draw.text((sx + 24, y), k, font=small, fill=MUTED)
        draw.text((sx + 24, y + 16), v, font=mono, fill=WHITE)
        y += 38

    draw.text((sx + 24, y + 8), "Pipeline log", font=mono_b, fill=GREEN)
    y += 32
    log = [
        "18:42:08  Vehicle in frame",
        "18:42:09  Plate localised",
        "18:42:09  Plate cropped, OCR run",
        "18:42:09  Plate logged",
    ]
    for line in log:
        draw.text((sx + 24, y), line, font=small, fill=MUTED)
        y += 20

    draw.text((W - 220, H - 24), "Real scene + repo metrics HUD", font=small, fill=(80, 90, 100))
    return canvas


def composite_border() -> Image.Image:
    ref = ASSETS / "border_hud_reference.jpg"
    if ref.is_file():
        return Image.open(ref).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)

    feed = _load_feed("border_scene_base.jpg")
    canvas = Image.new("RGB", (W, H), PANEL)
    canvas.paste(feed, (0, 0))
    draw = ImageDraw.Draw(canvas)
    mono = _font(13)
    small = _font(11)

    draw.text((24, 18), "CAM 03  |  SECTOR FENCE LINE  |  DUSK", font=mono, fill=WHITE)
    draw.text((FEED_W - 280, 18), "● REC  2026-10-27  19:05:11", font=mono, fill=(255, 80, 80))
    draw.text((24, H - 32), "OpenCV Haar face detect  |  LBPH recognizer", font=small, fill=MUTED)

    fx0, fy0, fx1, fy1 = 480, 220, 560, 320
    draw.rectangle((fx0, fy0, fx1, fy1), outline=GREEN, width=3)
    draw.rectangle((fx0, fy0 - 22, fx0 + 120, fy0), fill=GREEN)
    draw.text((fx0 + 6, fy0 - 20), "face  0.91", font=small, fill=(0, 40, 20))

    draw_corner_brackets(draw, 16, 12, FEED_W - 16, H - 12, WHITE)

    sx = FEED_W
    draw.rectangle((sx, 0, W, H), fill=PANEL)
    draw.line([(sx, 0), (sx, H)], fill=PANEL_LINE, width=2)
    y0 = _sidebar_header(draw, sx, "IDENTITY CHECK", "Status: label pending")
    draw.rectangle((sx + 20, y0, W - 20, y0 + 72), fill=WHITE)
    draw.text((sx + 36, y0 + 18), "SUBJECT_042", font=_font(24, True), fill=(10, 10, 10))

    lines = [
        ("Detector", "Haar cascade (frontal)"),
        ("Recognizer", "LBPH (OpenCV)"),
        ("Face confidence", "0.91"),
        ("Repo note", "Notebooks + LBPH; no OSNet in tree"),
    ]
    y = y0 + 92
    for k, v in lines:
        draw.text((sx + 24, y), k, font=small, fill=MUTED)
        draw.text((sx + 24, y + 16), v, font=mono, fill=WHITE)
        y += 38

    draw.text((sx + 24, y + 8), "Pipeline log", font=_font(14, True), fill=GREEN)
    y += 32
    for line in (
        "19:05:10  Frame acquired",
        "19:05:11  Face localised",
        "19:05:11  LBPH predict",
        "19:05:11  Logged to notebook output",
    ):
        draw.text((sx + 24, y), line, font=small, fill=MUTED)
        y += 20

    draw.text((W - 240, H - 24), "Real scene + repo-accurate HUD", font=small, fill=(80, 90, 100))
    return canvas


HUD_SLUGS = {
    "intelligent-vehicle-recognition-alpr": composite_alpr,
    "ai-border-security": composite_border,
}


def main() -> None:
    report = {}
    for slug, fn in HUD_SLUGS.items():
        out_dir = PUBLIC / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        img = fn()
        jpg = out_dir / "preview.jpg"
        poster = out_dir / "poster.jpg"
        img.save(jpg, quality=93)
        img.save(poster, quality=93)
        report[slug] = str(jpg)
        print(f"Wrote {jpg}")

    (ASSETS / "hud_render_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
