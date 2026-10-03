# Danielle's Blog

## Deployment
Deploys to Cloudflare Pages automatically from the main branch.

## Testing
Run `npm run lint:check`, `npm run format:check`, and `npm run build` (includes type checking).

E2E tests use Playwright (`npm run test:e2e`). Tests live in `e2e/`. Use `npm run test:e2e:ui` for the interactive UI runner.

## Dependencies
Installing dependencies on macOS can drop Linux-only optional packages from `package-lock.json`. If Linux `npm ci` fails with `Missing: ... from lock file`, regenerate the lockfile in Linux:

```bash
docker run --rm -v "$PWD":/app -w /app node:24 npm install --package-lock-only
```

CI uses `npm ci` and does not repair the lockfile.

## Images
- Store in `public/assets/` with kebab-case names
- Compress to under 200KB; max width 1200px
- Run `npm run compress-images` after adding new images (macOS only, uses `sips`). It resizes images and compresses JPEGs; check file sizes separately.
