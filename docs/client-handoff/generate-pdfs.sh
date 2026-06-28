#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CSS="$ROOT/client-handoff-pdf.css"

docs=(wireframe theme content)

for doc in "${docs[@]}"; do
  src="$ROOT/diti-engineers-${doc}.md"
  html="$ROOT/diti-engineers-${doc}.html"
  pdf="$ROOT/diti-engineers-${doc}.pdf"

  echo "→ Building ${doc}…"

  pandoc "$src" \
    -f markdown+raw_html \
    -t html5 \
    -o "$html" \
    --standalone \
    --metadata title="" \
    --css "$CSS"

  weasyprint "$html" "$pdf"
  rm -f "$html"

  echo "   ✓ ${pdf}"
done

echo "Done — 3 PDFs ready in docs/client-handoff/"
