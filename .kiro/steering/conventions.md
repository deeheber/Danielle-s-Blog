# Development Conventions

## File Naming
- **Components**: PascalCase for React components (`Card.tsx`, `Search.tsx`)
- **Astro Components**: PascalCase with `.astro` extension (`Header.astro`, `Footer.astro`)
- **Utilities**: camelCase (`getSortedBlogPosts.ts`, `slugify.ts`)
- **Blog Posts**: kebab-case with descriptive names (`AWS-Amplify-Review.md`)
- **Assets**: kebab-case for images (`hero-neon.jpg`, `profile-pic.jpg`)

## Component Patterns
- **Astro Components**: Use for static content and layouts
- **React Components**: Use for interactive elements (search, pagination)
- **Props**: Always type props interfaces in TypeScript
- **Styling**: Use TailwindCSS classes, avoid inline styles

## Content Guidelines
- **Blog Posts**: Must include all required frontmatter fields
- **Images**: Store in `public/assets/` and reference with `/assets/` path
- **Tags**: Use lowercase, hyphenated tags for consistency
- **Dates**: Use ISO format for `pubDatetime` in frontmatter

## Performance Considerations
- **Images**: Optimize images before adding to `public/assets/`
- **Components**: Prefer Astro components for static content
- **Imports**: Use path aliases (`@components/*`, `@utils/*`) consistently
- **Bundle Size**: Avoid large dependencies for client-side code

## Accessibility
- **Images**: Always include descriptive `alt` attributes
- **Links**: Use descriptive link text, avoid "click here"
- **Headings**: Use proper heading hierarchy (h1 → h2 → h3)
- **Focus**: Ensure keyboard navigation works for interactive elements

## SEO Best Practices
- **Meta Tags**: Include description in all blog post frontmatter
- **OpenGraph**: Use custom OG images when appropriate
- **URLs**: Keep URLs clean and descriptive
- **Sitemap**: Automatic generation via Astro sitemap integration

## Code Quality Workflow

### Before Committing Code
Always run these commands to ensure code quality:

```bash
npm run type-check    # Check TypeScript types
npm run lint:check    # Check for linting issues
npm run format:check  # Check code formatting
```

### Auto-fixing Issues
If the checks above find issues, use these commands to fix them:

```bash
npm run lint     # Auto-fix ESLint issues
npm run format   # Auto-format code with Prettier
```

### CI/CD Validation
- **Pull Requests**: GitHub Actions automatically runs format, lint, and type checks
- **Manual Testing**: PR checklist includes testing main pages, search, and RSS feed
- **Ensure CI Passes**: Always verify GitHub Actions pass before merging PRs

### IDE Integration
- **ESLint**: Configure your editor to show linting errors inline
- **Prettier**: Enable format-on-save for automatic formatting
- **TypeScript**: Use TypeScript language server for real-time type checking

### When to Run Checks
- **During Development**: Rely on IDE integration for real-time feedback
- **Before Commits**: Always run the check commands manually
- **CI/CD**: The build process includes these checks automatically