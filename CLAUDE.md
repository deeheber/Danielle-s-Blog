# Danielle's Blog

## Deployment
Deploys to Cloudflare Pages automatically from the main branch.

## Testing
Quality assurance: `npm run type-check`, `npm run lint:check`, `npm run format:check`, and `npm run build`.

E2E tests use Playwright (`npm run test:e2e`). Tests live in `e2e/`. Use `npm run test:e2e:ui` for the interactive UI runner.

## Images
- Store in `public/assets/` with kebab-case names
- Compress to under 200KB; max width 1200px
- Run `npm run compress-images` after adding new images (macOS only, uses `sips`)
