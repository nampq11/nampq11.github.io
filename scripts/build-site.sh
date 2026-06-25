#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/src"
OUTPUT_DIR="$ROOT_DIR/_site"
INCLUDES_DIR="$SOURCE_DIR/includes"
RENDER_INCLUDES="$ROOT_DIR/scripts/render-includes.py"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

python3 "$RENDER_INCLUDES" "$SOURCE_DIR/pages" "$OUTPUT_DIR" "$INCLUDES_DIR"
python3 "$RENDER_INCLUDES" "$SOURCE_DIR/index.html" "$OUTPUT_DIR/index.html" "$INCLUDES_DIR"
python3 "$RENDER_INCLUDES" "$SOURCE_DIR/search.html" "$OUTPUT_DIR/search.html" "$INCLUDES_DIR"
python3 "$RENDER_INCLUDES" "$SOURCE_DIR/cv.html" "$OUTPUT_DIR/cv.html" "$INCLUDES_DIR"

cp "$SOURCE_DIR/rss.xml" "$OUTPUT_DIR/rss.xml"
cp "$SOURCE_DIR/.nojekyll" "$OUTPUT_DIR/.nojekyll"
cp -a "$SOURCE_DIR/assets" "$OUTPUT_DIR/assets"
cp -a "$SOURCE_DIR/javascripts" "$OUTPUT_DIR/javascripts"
cp -a "$SOURCE_DIR/stylesheets" "$OUTPUT_DIR/stylesheets"
