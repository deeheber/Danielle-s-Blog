# Technology Stack

## Core Framework
- **Astro 5.x**: Static site generator with component islands architecture
- **React 19.x**: Component framework for interactive elements
- **TypeScript 5.x**: Strict type checking with exact optional property types

## Styling & UI
- **TailwindCSS 4.x**: Utility-first CSS framework with custom theme and Vite integration
- **Custom CSS Variables**: Theme system using CSS custom properties for colors
- **Typography Plugin**: @tailwindcss/typography for markdown content styling

## Content Management
- **Astro Content Collections**: Type-safe content management for blog posts
- **Markdown**: Blog posts written in markdown with frontmatter
- **Remark Plugins**: Table of contents and collapsible sections

## Search & Performance
- **FuseJS**: Fuzzy search functionality
- **Jampack**: Build optimization and performance enhancements
- **Satori & @resvg/resvg-js**: Dynamic OpenGraph image generation

## Development Tools
- **ESLint**: Linting with TypeScript, React, Astro, and accessibility rules
- **Prettier**: Code formatting with Astro and TailwindCSS plugins
- **TypeScript**: Strict configuration with path aliases

## Testing Strategy

This is a personal blog without automated tests. Quality assurance relies on:
- **TypeScript Type Checking**: Compile-time validation via `npm run type-check`
- **ESLint**: Code quality and best practices enforcement
- **Prettier**: Consistent code formatting
- **Local Preview**: Testing changes via `npm run build && npm run preview`
- **Build Validation**: CI/CD pipeline ensures successful builds before deployment
- **Manual Review**: Visual inspection of blog posts and features before publishing

The static nature of the site and Astro's build-time validation make automated tests less critical than for dynamic applications.

## Code Style & Formatting

### ESLint Configuration
- **TypeScript**: Strict rules with `@typescript-eslint/no-explicit-any` as error
- **Import Organization**: Alphabetical ordering with newlines between groups
- **React**: Standard React rules with JSX accessibility checks
- **Astro**: Astro-specific linting rules
- **Unused Variables**: Warn for unused vars/args starting with underscore

### Prettier Configuration
- **No Semicolons**: `"semi": false`
- **Double Quotes**: `"singleQuote": false`
- **Trailing Commas**: Always include trailing commas
- **Tab Width**: 2 spaces
- **Print Width**: 80 characters
- **Single Attribute Per Line**: JSX attributes on separate lines
- **Plugins**: Astro and TailwindCSS formatting support

### Import Order (ESLint)
1. Node.js built-ins
2. External packages
3. Internal modules
4. Parent/sibling imports
5. Index imports

## Common Commands

```bash
# Development
npm run dev          # Start development server at localhost:4321
npm run start        # Alias for dev command

# Building & Preview
npm run build        # Type check + build + optimize with Jampack
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check linting without fixing
npm run format       # Format code with Prettier
npm run format:check # Check formatting without fixing
npm run type-check   # TypeScript type checking without emit

# Astro Specific
npm run sync         # Generate TypeScript types for Astro modules
```

## Build Process
1. TypeScript type checking (`tsc --noEmit`)
2. Astro build to `./dist/`
3. Jampack optimization for performance

## Node.js Version
Check `.nvmrc` file for the required Node.js version.

## Dependencies Management

### Checking for Updates
```bash
npm outdated              # Check for outdated packages
npm outdated --long       # Detailed view with package types
```

### Update Strategy

**Patch Updates** (e.g., 5.0.1 → 5.0.2)
- Safe to update regularly
- Run `npm update` to update within current minor versions
- Review changes and test build before committing

**Minor Updates** (e.g., 5.0.x → 5.1.x)
- Generally backward compatible but review changelog
- Update individually: `npm install package@latest`
- Test thoroughly, especially for core dependencies (Astro, React)

**Major Updates** (e.g., 5.x.x → 6.x.x)
- Review migration guides before updating
- Key packages requiring extra care:
  - **Astro**: Check migration guide, may require config changes
  - **React**: Review breaking changes, update React components
  - **TailwindCSS**: Review breaking changes in utility classes
  - **TypeScript**: May require tsconfig.json adjustments
- Test all functionality after major updates
- Update one major dependency at a time

### Security Updates
- Monitor GitHub security alerts
- Prioritize security patches regardless of version type
- Run `npm audit` regularly to check for vulnerabilities
- Apply fixes with `npm audit fix` (review changes first)

### Best Practices
- **Before Updates**: Commit all current changes
- **After Updates**: Run full quality checks
  ```bash
  npm run type-check
  npm run lint:check
  npm run format:check
  npm run build
  ```
- **Update Regularly**: Monthly check for minor/patch updates
- **Document Breaking Changes**: Note any config or code changes in commits
- **Lock File**: Always commit `package-lock.json` changes with dependency updates

## Environment Variables

This project does not require environment variables for local development or production builds. All configuration is managed through:
- **Site Configuration**: `src/config.ts` contains site metadata, social links, and global settings
- **Astro Configuration**: `astro.config.ts` for framework and integration settings
- **Build-time Values**: All values are static and embedded during the build process

If environment-specific configuration is needed in the future (e.g., analytics IDs, API keys), use Astro's built-in `import.meta.env` and document them here.

## Development Workflow

### Before Starting Development
1. Check Node.js version matches `.nvmrc`
2. Run `npm install` to install dependencies
3. Run `npm run sync` to generate Astro types
4. Start development server with `npm run dev`

### Before Committing
1. Run `npm run type-check` to verify TypeScript
2. Run `npm run lint:check` to check for linting issues
3. Run `npm run format:check` to verify formatting
4. Fix any issues with `npm run lint` and `npm run format`

### Common Issues
- **Build Failures**: Usually TypeScript errors - check `npm run type-check`
- **Styling Issues**: Ensure TailwindCSS classes are correct and custom CSS uses proper variables
- **Import Errors**: Use path aliases consistently (`@components/*` not `../components/`)
- **Content Errors**: Verify blog post frontmatter matches schema in `src/content/config.ts`