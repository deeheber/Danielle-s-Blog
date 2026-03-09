# Danielle's Blog

## Deployment
Deploys to Cloudflare Pages automatically from the main branch.

## Testing
No automated tests. Quality assurance is: `npm run type-check`, `npm run lint:check`, `npm run format:check`, and `npm run build`.

## Images
- Store in `public/assets/` with kebab-case names
- Reference in markdown as `/assets/filename.jpg`
- Compress to under 200KB; max width 1200px
- Run `npm run compress-images` after adding new images (macOS only, uses `sips`)
- Always include descriptive alt text
