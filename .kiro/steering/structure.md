# Project Structure

## Root Directory
- `astro.config.ts` - Astro configuration with integrations and markdown settings
- `tailwind.config.js` - TailwindCSS configuration with custom theme
- `tsconfig.json` - TypeScript configuration with path aliases
- `package.json` - Dependencies and npm scripts
- `docker-compose.yml` - Docker setup for development
- `eslint.config.mjs` - ESLint configuration for code quality
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files excluded from Prettier formatting
- `.nvmrc` - Node.js version specification
- `.markdownlint.json` - Markdown linting configuration

## Source Directory (`src/`)

### Configuration
- `src/config.ts` - Site metadata, social links, and global settings
- `src/types.ts` - TypeScript type definitions

### Content (`src/content/`)
- `src/content/config.ts` - Content collection schemas (blog posts)
- `src/content/blog/` - Blog posts as markdown files with frontmatter

### Components (`src/components/`)
- Astro components (`.astro`) for layout and static elements
- React components (`.tsx`) for interactive functionality
- Key components: Header, Footer, Search, Card, Pagination

### Pages (`src/pages/`)
- `index.astro` - Homepage
- `about.md` - About page
- `talks.astro` - Speaking engagements page
- `blog/` - Blog listing and individual post pages
- `tags/` - Tag-based filtering pages
- Dynamic routes use `[slug]` and `[page]` patterns

### Layouts (`src/layouts/`)
- Page layout components for consistent structure

### Utilities (`src/utils/`)
- Helper functions for blog operations (sorting, pagination, tags)
- OpenGraph image generation templates
- Content filtering and processing utilities

### Styles (`src/styles/`)
- `base.css` - Global CSS with custom properties for theming

### Data (`src/data/`)
- `speakingData.json` - Speaking engagement information

## Public Assets (`public/`)
- Static assets served directly
- `assets/` - Images for blog posts and site
- `fonts/` - Custom font files
- `Logo1(D).png` - Site logo

## Path Aliases (tsconfig.json)
```typescript
"@assets/*": ["assets/*"]
"@config": ["config.ts"]
"@components/*": ["components/*"]
"@content/*": ["content/*"]
"@layouts/*": ["layouts/*"]
"@pages/*": ["pages/*"]
"@styles/*": ["styles/*"]
"@utils/*": ["utils/*"]
```

## Blog Post Structure
Blog posts in `src/content/blog/` must include frontmatter:
- `title` - Post title
- `description` - SEO description
- `pubDatetime` - Publication date
- `author` - Author name (defaults to site author)
- `tags` - Array of tags
- `featured` - Optional featured flag
- `draft` - Optional draft flag
- `ogImage` - Optional custom OpenGraph image

## Generated Directories
- `.astro/` - Astro build cache and type definitions
- `dist/` - Production build output
- `node_modules/` - Dependencies
- `.jampack/` - Jampack optimization cache