# Diti Engineers — Client Handoff Pack

Three documents for client review, sign-off, and sharing.

| Document | Markdown | PDF | Purpose |
|----------|----------|-----|---------|
| **Wireframe** | [diti-engineers-wireframe.md](./diti-engineers-wireframe.md) | [diti-engineers-wireframe.pdf](./diti-engineers-wireframe.pdf) | Page layout, navigation, scroll structure |
| **Theme** | [diti-engineers-theme.md](./diti-engineers-theme.md) | [diti-engineers-theme.pdf](./diti-engineers-theme.pdf) | Colours, typography, spacing, visual rules |
| **Content** | [diti-engineers-content.md](./diti-engineers-content.md) | [diti-engineers-content.pdf](./diti-engineers-content.pdf) | All copy, labels, and placeholder flags |

## Regenerate PDFs

```bash
cd docs/client-handoff
chmod +x generate-pdfs.sh
./generate-pdfs.sh
```

Requires [Pandoc](https://pandoc.org/) and [WeasyPrint](https://weasyprint.org/).

## Sharing with clients

Send all three PDFs together. Recommended order:

1. Wireframe — understand site structure
2. Theme — understand visual direction
3. Content — review and approve copy; complete action list items
