"""
Bump font sizes on the tutorial scenes (30-39) so they read at embedded size.

Second pass: focused on everything still below 2vw, which is where the
readability problem still lives. Headings 2vw+ are already big enough so
are intentionally left alone.

Only modifies the tutorial zone (from `function StepBadge` onwards).
The /demo/60 scenes (1-13) are untouched.
"""

import re
from pathlib import Path

FILE = Path(__file__).resolve().parents[1] / "components" / "marketing" / "ExplainerVideoV2.tsx"
TUTORIAL_START_MARKER = "function StepBadge({"

# Second-pass mapping — only sizes < 2vw get bumped. Headings (2vw+) are
# already readable so left as-is to avoid breaking layout / making them
# comically large in fullscreen.
SIZE_MAP = {
    "0.9":  "1.2",
    "0.95": "1.25",
    "1":    "1.3",
    "1.05": "1.35",
    "1.1":  "1.4",
    "1.15": "1.45",
    "1.2":  "1.5",
    "1.25": "1.55",
    "1.3":  "1.6",
    "1.35": "1.65",
    "1.4":  "1.7",
    "1.45": "1.75",
    "1.5":  "1.8",
    "1.55": "1.85",
    "1.6":  "1.9",
    "1.65": "1.95",
    "1.7":  "2",
    "1.75": "2.05",
    "1.8":  "2.1",
    "1.85": "2.15",
    "1.9":  "2.2",
    "1.95": "2.25",
}

def remap(match: re.Match) -> str:
    full, num = match.group(0), match.group(1)
    new = SIZE_MAP.get(num)
    if new is None:
        return full
    return full.replace(num + "vw", new + "vw")

def main() -> None:
    src = FILE.read_text(encoding="utf-8")
    idx = src.find(TUTORIAL_START_MARKER)
    if idx == -1:
        raise SystemExit(f"Could not find tutorial start marker: {TUTORIAL_START_MARKER!r}")
    before, tutorial = src[:idx], src[idx:]

    patterns = [
        re.compile(r"text-\[([0-9.]+)vw\]"),
        re.compile(r'width="([0-9.]+)vw"'),
        re.compile(r'height="([0-9.]+)vw"'),
    ]
    for p in patterns:
        tutorial = p.sub(remap, tutorial)

    FILE.write_text(before + tutorial, encoding="utf-8")
    print(f"Updated {FILE} — tutorial section starts at byte {idx}")

if __name__ == "__main__":
    main()
