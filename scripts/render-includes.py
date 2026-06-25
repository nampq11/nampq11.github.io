#!/usr/bin/env python3
"""Render tiny HTML include comments for this static site.

Supported syntax:
  <!-- @include header root="../" active="writing" -->
  <!-- @include footer root="../" -->

This deliberately stays small and dependency-free; it is not a general template engine.
"""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

INCLUDE_PATTERN = re.compile(r"<!--\s*@include\s+(header|footer)(.*?)\s*-->")
ATTR_PATTERN = re.compile(r'(\w+)="([^"]*)"')
ACTIVE_KEYS = {
    "start-here": "activeStartHere",
    "writing": "activeWriting",
    "projects": "activeProjects",
    "cv": "activeCv",
    "about": "activeAbout",
    "search": "activeSearch",
}


def parse_attrs(raw_attrs: str) -> dict[str, str]:
    return {key: value for key, value in ATTR_PATTERN.findall(raw_attrs)}


def render_partial(partial: str, raw_attrs: str, includes_dir: Path) -> str:
    attrs = parse_attrs(raw_attrs)
    root = attrs.get("root", "")
    active = attrs.get("active", "")

    html = (includes_dir / f"{partial}.html").read_text()
    html = html.replace("{{root}}", root)

    for active_name, token in ACTIVE_KEYS.items():
        active_class = ' class="active"' if active == active_name else ""
        html = html.replace("{{" + token + "}}", active_class)

    return html


def render_html(source: Path, destination: Path, includes_dir: Path) -> None:
    html = source.read_text()
    html = INCLUDE_PATTERN.sub(
        lambda match: render_partial(match.group(1), match.group(2), includes_dir),
        html,
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(html)


def copy_tree_with_includes(source_dir: Path, destination_dir: Path, includes_dir: Path) -> None:
    for source in source_dir.rglob("*"):
        if source.is_dir():
            continue

        relative_path = source.relative_to(source_dir)
        destination = destination_dir / relative_path

        if source.suffix == ".html":
            render_html(source, destination, includes_dir)
        else:
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)


def copy_path_with_includes(source: Path, destination: Path, includes_dir: Path) -> None:
    if source.is_dir():
        copy_tree_with_includes(source, destination, includes_dir)
        return

    if source.suffix == ".html":
        render_html(source, destination, includes_dir)
        return

    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def main() -> int:
    if len(sys.argv) != 4:
        print("Usage: render-includes.py <source> <destination> <includes-dir>", file=sys.stderr)
        return 2

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    includes_dir = Path(sys.argv[3])

    copy_path_with_includes(source, destination, includes_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
