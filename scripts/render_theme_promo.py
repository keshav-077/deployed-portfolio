"""Category-themed marketing MP4 (no training plots / random repo outputs)."""
from __future__ import annotations

import argparse
import json
import math
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw, ImageFont

from doc36_common import OUT_H, OUT_W, PUBLIC, ffmpeg_bin, poster_from_mp4
from portfolio_projects import parse_projects, repo_path_for

ROOT = Path(__file__).resolve().parents[1]

C = {
    "navy": (28, 43, 54),
    "cream": (246, 242, 238),
    "accent": (200, 70, 42),
    "teal": (45, 138, 158),
    "muted": (97, 122, 138),
    "white": (255, 255, 255),
}


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


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_w: int, max_lines: int = 5) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=font) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
        if len(lines) >= max_lines:
            break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    return lines


def theme_key(category: str) -> str:
    c = category.lower()
    if "computer vision" in c or "real-time" in c:
        return "cv"
    if "generative" in c:
        return "gen"
    if "llm" in c or "rag" in c:
        return "rag"
    if "reinforcement" in c:
        return "rl"
    if "nlp" in c or "language" in c:
        return "nlp"
    if "cloud" in c or "distributed" in c or "backend" in c:
        return "cloud"
    if "full-stack" in c or "desktop" in c:
        return "app"
    return "ml"


def draw_bg(draw: ImageDraw.ImageDraw, t: float, theme: str) -> None:
    for y in range(OUT_H):
        wave = 0.04 * math.sin(t * 6.28 + y * 0.02)
        u = y / OUT_H + wave
        r = int(C["navy"][0] * (1 - u) + C["cream"][0] * u)
        g = int(C["navy"][1] * (1 - u) + C["cream"][1] * u)
        b = int(C["navy"][2] * (1 - u) + C["cream"][2] * u)
        draw.line([(0, y), (OUT_W, y)], fill=(r, g, b))
    draw.rectangle((0, 0, OUT_W, 5), fill=C["accent"])
    if theme == "cv":
        pulse = int(40 + 30 * math.sin(t * 8))
        draw.rectangle((80 + pulse, 200, 220 + pulse, 280), outline=C["accent"], width=3)
        draw.rectangle((300, 180, 480, 300), outline=C["teal"], width=2)
    elif theme == "gen":
        for i in range(3):
            for j in range(4):
                s = 28 + int(8 * math.sin(t * 10 + i + j))
                x = 100 + j * 110
                y = 190 + i * 45 + int(10 * math.sin(t * 6 + j))
                col = C["teal"] if (i + j) % 2 == 0 else C["accent"]
                draw.rectangle((x, y, x + s, y + s), fill=col)
    elif theme == "rag":
        draw.rounded_rectangle((60, 190, 320, 250), radius=12, fill=C["white"], outline=C["navy"])
        draw.rounded_rectangle((280, 230, OUT_W - 60, 310), radius=12, fill=C["teal"])
        draw.text((72, 208), "Ask anything...", font=_font(11), fill=C["muted"])
    elif theme == "rl":
        for i in range(5):
            h = int(40 + 35 * abs(math.sin(t * 4 + i * 0.5)))
            draw.rectangle((100 + i * 70, 280 - h, 140 + i * 70, 280), fill=C["teal"])
        pts = [(120 + i * 14, 240 - int(25 * math.sin(i * 0.3 + t * 8))) for i in range(35)]
        if len(pts) > 1:
            draw.line(pts, fill=C["accent"], width=2)
    elif theme == "nlp":
        draw.rectangle((70, 200, 260, 290), fill=C["white"], outline=C["navy"])
        draw.polygon([(280, 240), (310, 255), (280, 270)], fill=C["accent"])
        draw.rectangle((320, 200, OUT_W - 70, 290), fill=C["panel"] if False else (227, 235, 240))
    elif theme == "cloud":
        for i, (x, y) in enumerate([(120, 220), (320, 200), (520, 230)]):
            draw.ellipse((x, y, x + 60, y + 40), fill=C["teal"] if i == 1 else C["white"], outline=C["navy"])
        draw.line([(150, 240), (350, 220), (550, 250)], fill=C["accent"], width=2)
    else:
        draw.ellipse((OUT_W // 2 - 80, 200, OUT_W // 2 + 80, 360), outline=C["teal"], width=2)


def frame_project(meta: dict, t: float, phase: str) -> Image.Image:
    theme = theme_key(meta.get("category", ""))
    img = Image.new("RGB", (OUT_W, OUT_H), C["cream"])
    draw = ImageDraw.Draw(img)
    draw_bg(draw, t, theme)

    name = meta["name"]
    desc = meta.get("description", "")
    cat = meta.get("category", "")

    alpha = min(1.0, t * 2) if phase == "intro" else 1.0
    title_f = _font(26, bold=True)
    draw.text((32, 36), name[:42], font=title_f, fill=C["navy"])
    draw.text((32, 72), cat[:36], font=_font(11), fill=C["teal"])

    body_y = 100
    if phase in ("intro", "story"):
        lines = wrap(draw, desc, _font(13), OUT_W - 64, 4)
        for i, line in enumerate(lines):
            draw.text((32, body_y + i * 20), line, font=_font(13), fill=C["muted"])

    if phase == "tech":
        draw.text((32, 100), "Built with", font=_font(12), fill=C["navy"])
        chips = meta.get("techStack", [])[:6]
        x, y = 32, 128
        for chip in chips:
            w = int(draw.textlength(chip, font=_font(10))) + 20
            draw.rounded_rectangle((x, y, x + w, y + 24), radius=4, fill=C["accent"])
            draw.text((x + 10, y + 5), chip, font=_font(10), fill=C["white"])
            x += w + 8
            if x > OUT_W - 100:
                x = 32
                y += 32

    draw.text((32, OUT_H - 28), "Portfolio preview", font=_font(9), fill=C["muted"])
    return img


def build_frames(meta: dict) -> list[Image.Image]:
    frames: list[Image.Image] = []
    for i in range(28):
        frames.append(frame_project(meta, i / 28, "intro"))
    for i in range(32):
        frames.append(frame_project(meta, i / 32, "story"))
    for i in range(24):
        t = i / 24
        f = frame_project(meta, t, "tech")
        frames.append(f)
    for i in range(20):
        frames.append(frame_project(meta, i / 20, "intro"))
    return frames


def write_mp4(frames: list[Image.Image], mp4: Path) -> None:
    mp4.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        for i, fr in enumerate(frames):
            fr.save(td_path / f"frame_{i:05d}.png")
        pattern = (td_path / "frame_%05d.png").as_posix()
        cmd = [
            ffmpeg_bin(),
            "-y",
            "-framerate",
            "24",
            "-i",
            pattern,
            "-c:v",
            "libx264",
            "-crf",
            "26",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(mp4),
        ]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError(r.stderr[-500:])


def render(project_id: str) -> dict:
    meta = next((p for p in parse_projects() if p["id"] == project_id), None)
    if not meta:
        raise SystemExit(f"Unknown project: {project_id}")
    out = PUBLIC / project_id / "preview.mp4"
    poster = PUBLIC / project_id / "poster.jpg"
    frames = build_frames(meta)
    write_mp4(frames, out)
    poster_from_mp4(out, poster)
    report = {
        "portfolioId": project_id,
        "source": "theme_promo",
        "frameCount": len(frames),
        "theme": theme_key(meta.get("category", "")),
    }
    (PUBLIC / project_id / "preview_report.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )
    return report


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--id", required=True)
    args = ap.parse_args()
    rep = render(args.id)
    print(f"Theme promo {args.id}: {rep['theme']}, {rep['frameCount']} frames")


if __name__ == "__main__":
    main()
