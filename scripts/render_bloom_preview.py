"""DEPRECATED: use install_bloom_preview.py (repo docs/demo.gif). Synthetic fallback only."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "projects" / "healthcare-assistant"
W, H = 1280, 720
FRAMES = 24
FPS = 8

BG_TOP = (255, 245, 238)
BG_BOT = (255, 228, 225)
GREEN = (74, 93, 35)
PINK = (227, 37, 107)
WHITE = (255, 255, 255)


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


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * max(0.0, min(1.0, t))


def draw_frame(t: float) -> Image.Image:
    img = Image.new("RGB", (W, H), BG_TOP)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        u = y / H
        r = int(BG_TOP[0] * (1 - u) + BG_BOT[0] * u)
        g = int(BG_TOP[1] * (1 - u) + BG_BOT[1] * u)
        b = int(BG_TOP[2] * (1 - u) + BG_BOT[2] * u)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    draw.rounded_rectangle((48, 48, W - 48, H - 48), radius=28, fill=WHITE, outline=(74, 93, 35, 40))
    draw.ellipse((88, 88, 124, 124), fill=PINK)
    draw.text((140, 92), "Bloom Health Assistant", font=_font(28, True), fill=GREEN)
    draw.text((140, 128), "Medical RAG · grounded answers · citations", font=_font(16), fill=(110, 120, 90))

    user_in = lerp(0, 1, (t - 0.05) / 0.2)
    bot_in = lerp(0, 1, (t - 0.25) / 0.2)
    cite_in = lerp(0, 1, (t - 0.45) / 0.2)

    if user_in > 0:
        uy = int(lerp(12, 0, user_in))
        draw.rounded_rectangle((W - 420, 200 + uy, W - 100, 268 + uy), radius=20, fill=PINK)
        draw.text((W - 400, 222 + uy), "What is metformin used for?", font=_font(20), fill=WHITE)

    if bot_in > 0:
        by = int(lerp(12, 0, bot_in))
        draw.rounded_rectangle((100, 300 + by, 720, 420 + by), radius=20, fill=(240, 255, 244), outline=GREEN)
        draw.text(
            (120, 328 + by),
            "Metformin lowers blood glucose in type 2 diabetes.",
            font=_font(18),
            fill=GREEN,
        )
        draw.text(
            (120, 358 + by),
            "Educational summary — not medical advice.",
            font=_font(15),
            fill=(110, 120, 90),
        )

    if cite_in > 0:
        draw.rounded_rectangle((100, 460, 380, 508), radius=16, outline=GREEN)
        draw.text((240, 478), "1 citation · India monograph", font=_font(14, True), fill=PINK, anchor="mm")

    pulse = 0.5 + 0.5 * math.sin(t * math.pi * 4)
    pink_muted = (int(180 + 40 * pulse), int(80 + 20 * pulse), int(110 + 20 * pulse))
    draw.text((W // 2, H - 72), "LangGraph · guardrails · MCP", font=_font(13), fill=pink_muted, anchor="mm")
    return img


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    frames: list[Image.Image] = []
    for i in range(FRAMES):
        t = (i / FRAMES) % 1.0
        frames.append(draw_frame(t))
    gif_path = OUT_DIR / "preview.gif"
    poster = OUT_DIR / "poster.jpg"
    pal_frames = [f.convert("P", palette=Image.ADAPTIVE, colors=256) for f in frames]
    pal_frames[0].save(
        gif_path,
        save_all=True,
        append_images=pal_frames[1:],
        duration=int(1000 / FPS),
        loop=0,
    )
    frames[FRAMES // 3].save(poster, quality=92)
    print(f"Wrote {gif_path} and {poster}")


if __name__ == "__main__":
    main()
