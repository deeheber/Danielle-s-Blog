#!/bin/bash
# Compress images in public/assets/ using macOS sips (no extra dependencies).
# Resizes to max 1200px width and applies JPEG quality 80.

set -euo pipefail

ASSETS_DIR="$(cd "$(dirname "$0")/../public/assets" && pwd)"

echo "Resizing images wider than 1200px..."
for f in "$ASSETS_DIR"/*.jpg "$ASSETS_DIR"/*.jpeg "$ASSETS_DIR"/*.png; do
  [ -f "$f" ] || continue
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  if [ "$w" -gt 1200 ]; then
    sips --resampleWidth 1200 "$f" > /dev/null 2>&1
    echo "Resized: $(basename "$f")"
  fi
done

echo "Compressing JPEGs..."
for f in "$ASSETS_DIR"/*.jpg "$ASSETS_DIR"/*.jpeg; do
  [ -f "$f" ] || continue
  sips -s formatOptions 80 "$f" > /dev/null 2>&1
done

echo "Done!"
