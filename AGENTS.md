# Danielle's Blog

## Deployment
Deploys to Cloudflare Pages automatically from the main branch.

## Testing
Quality assurance: `npm run type-check`, `npm run lint:check`, `npm run format:check`, and `npm run build`.

E2E tests use Playwright (`npm run test:e2e`). Tests live in `e2e/`. Use `npm run test:e2e:ui` for the interactive UI runner.

## Dependencies
Native/WASM deps (Tailwind's `oxide`, the ESLint TS resolver, Astro's optional `sharp`) record platform-specific optional packages (e.g. `@emnapi/*`) in `package-lock.json`. Running `npm install` on macOS can drop the Linux-only ones — this builds fine locally but breaks `npm ci` on Linux CI/Cloudflare with `Missing: ... from lock file`. Bot/CI dependency bumps run on Linux and are unaffected; if you change deps locally and hit this, regenerate the lockfile in Linux (`docker run --rm -v "$PWD":/app -w /app node:24 npm install --package-lock-only`) or let CI regenerate it.

## Images
- Store in `public/assets/` with kebab-case names
- Compress to under 200KB; max width 1200px
- Run `npm run compress-images` after adding new images (macOS only, uses `sips`)
