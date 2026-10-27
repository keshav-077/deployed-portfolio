"""Fetch cinematic base clip via Runway or Kling (requires API keys)."""
from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

from env_loader import load_env_local

RUNWAY_API = "https://api.dev.runwayml.com/v1"
RUNWAY_VERSION = "2024-11-06"


def has_runway() -> bool:
    load_env_local()
    return bool(os.environ.get("RUNWAY_API_KEY", "").strip())


def has_kling() -> bool:
    load_env_local()
    return bool(os.environ.get("KLING_API_KEY", "").strip())


def _runway_request(method: str, path: str, body: dict | None = None) -> dict:
    key = os.environ.get("RUNWAY_API_KEY", "").strip()
    if not key:
        raise RuntimeError("RUNWAY_API_KEY missing")
    url = f"{RUNWAY_API}{path}"
    data = None
    headers = {
        "Authorization": f"Bearer {key}",
        "X-Runway-Version": RUNWAY_VERSION,
    }
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _download_url(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "portfolio-trailer/1"})
    with urllib.request.urlopen(req, timeout=300) as resp:
        dest.write_bytes(resp.read())


def fetch_runway(prompt: str, out_mp4: Path, duration_s: float = 6.0) -> bool:
    load_env_local()
    if not has_runway():
        return False
    notes = out_mp4.parent.parent / "notes.md"
    try:
        task = _runway_request(
            "POST",
            "/text_to_video",
            {
                "model": "gen4_turbo",
                "promptText": prompt,
                "ratio": "1280:720",
                "duration": int(min(10, max(2, round(duration_s)))),
            },
        )
        task_id = task.get("id")
        if not task_id:
            notes.write_text(f"Runway: no task id\n{json.dumps(task)}\n", encoding="utf-8")
            return False
        deadline = time.time() + 600
        while time.time() < deadline:
            status = _runway_request("GET", f"/tasks/{task_id}")
            st = status.get("status", "")
            if st == "SUCCEEDED":
                outputs = status.get("output") or []
                if not outputs:
                    return False
                video_url = outputs[0] if isinstance(outputs[0], str) else outputs[0].get("url")
                if not video_url:
                    return False
                out_mp4.parent.mkdir(parents=True, exist_ok=True)
                _download_url(video_url, out_mp4)
                notes.write_text(
                    f"Runway gen4_turbo\nPrompt: {prompt}\nTask: {task_id}\n",
                    encoding="utf-8",
                )
                return out_mp4.is_file() and out_mp4.stat().st_size > 10000
            if st in ("FAILED", "CANCELLED"):
                notes.write_text(
                    f"Runway failed: {st}\n{json.dumps(status, indent=2)}\n",
                    encoding="utf-8",
                )
                return False
            time.sleep(8)
    except (urllib.error.URLError, OSError, RuntimeError, json.JSONDecodeError) as exc:
        notes.write_text(f"Runway error: {exc}\nPrompt:\n{prompt}\n", encoding="utf-8")
    return False


def fetch_kling(prompt: str, out_mp4: Path) -> bool:
    """Kling JWT API — set KLING_API_KEY; extend when credentials format is confirmed."""
    load_env_local()
    key = os.environ.get("KLING_API_KEY", "").strip()
    if not key:
        return False
    notes = out_mp4.parent.parent / "notes.md"
    notes.write_text(
        f"Kling fallback (wire API): {prompt}\n",
        encoding="utf-8",
    )
    return False


def ensure_base_footage(slug: str, prompt: str, dest: Path) -> str:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.is_file() and dest.stat().st_size > 10000:
        return "cached"
    if has_runway() and fetch_runway(prompt, dest):
        return "runway"
    if has_kling() and fetch_kling(prompt, dest):
        return "kling"
    return "missing"
