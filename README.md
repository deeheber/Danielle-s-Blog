# Danielle's Blog

[My blog](https://danielleheberling.xyz/), built with Astro and React. PRs welcome, especially if you spot my typos!

## Local development

Use the Node.js version in [.nvmrc](.nvmrc).

```bash
npm ci
npm run dev
```

Open http://localhost:4321/.

## Editing content

- Blog posts: `src/content/blog/`. Frontmatter is defined in `src/content.config.ts`.
- Talks: `src/data/speakingData.json`.
- Site metadata, social links, and locale: `src/config.ts`.
- Image requirements and the macOS compression script: [AGENTS.md](AGENTS.md#images).

## Checks

```bash
npm run format:check
npm run lint:check
npm run build
```

The build includes type checking and writes to `dist/`. Use `npm run preview` to serve it locally. `npm run format` and `npm run lint` modify files.

For E2E tests, install Chromium after installing or updating Playwright, then run:

```bash
npx playwright install chromium
npm run test:e2e
```

The E2E command builds the site and starts a preview server. Stop any existing server on port 4321 first; local tests otherwise reuse it. Use `npm run test:e2e:ui` for the interactive runner.

PR validation runs formatting, lint, and build checks. Run the separate **E2E Tests** workflow manually in GitHub Actions, selecting the branch to test.

## Deployment and dependencies

Cloudflare Pages deploys `main` automatically. See [AGENTS.md](AGENTS.md#dependencies) for repairing a lockfile that installs locally but fails on Linux.
