# Content Management

## Creating a New Blog Post

### Step-by-Step Workflow

1. **Create the Markdown File**
   - Navigate to `src/content/blog/`
   - Create new file with kebab-case naming: `my-post-title.md`
   - Use descriptive, SEO-friendly names

2. **Add Required Frontmatter**
   ```markdown
   ---
   title: "Your Post Title"
   description: "SEO-friendly description of your post (155 characters or less)"
   pubDatetime: 2024-12-11T10:00:00Z
   author: "Danielle Heberling"
   tags: ["aws", "serverless", "tutorial"]
   featured: false
   draft: false
   ---
   ```

3. **Write Your Content**
   - Use proper markdown formatting
   - Follow heading hierarchy (h2 → h3 → h4)
   - Add code blocks with language specification
   - Include practical examples and real-world insights

4. **Add Images (if needed)**
   - Optimize images before adding (compress, resize appropriately)
   - Save to `public/assets/` directory
   - Use kebab-case naming: `post-title-diagram.jpg`
   - Reference in markdown: `![Descriptive alt text](/assets/post-title-diagram.jpg)`
   - Always include descriptive alt text for accessibility

5. **Preview Locally**
   ```bash
   npm run dev
   ```
   - Navigate to http://localhost:4321
   - Review post appearance and formatting
   - Check images display correctly
   - Test any links

6. **Run Quality Checks**
   ```bash
   npm run type-check
   npm run lint:check
   npm run format:check
   ```
   - Fix any issues with `npm run lint` and `npm run format`

7. **Build and Preview Production Version**
   ```bash
   npm run build
   npm run preview
   ```
   - Verify OpenGraph image generation
   - Check final appearance

8. **Commit and Deploy**
   - Commit changes with descriptive message
   - Push to main branch
   - Cloudflare Pages will automatically deploy

## Frontmatter Reference

### Required Fields
- `title` - Post title (appears in heading and meta tags)
- `description` - SEO description (155 characters or less)
- `pubDatetime` - Publication date in ISO 8601 format
- `tags` - Array of lowercase, hyphenated tags

### Optional Fields
- `author` - Defaults to site author if not specified
- `featured` - Set to `true` to feature on homepage (default: `false`)
- `draft` - Set to `true` to hide from production (default: `false`)
- `ogImage` - Custom OpenGraph image path (auto-generated if not specified)

## Tag Management

### Tag Guidelines
- Use lowercase only
- Hyphenate multi-word tags: `cloud-computing`
- Be consistent with existing tags
- Common tags: `aws`, `serverless`, `career`, `tutorial`, `review`

### Adding New Tags
- Check existing tags in other posts first
- Keep tag list focused and relevant
- Tags automatically generate tag pages via Astro

## Image Optimization

### Best Practices
- **Format**: Use JPG for photos, PNG for diagrams/screenshots
- **Size**: Resize to appropriate dimensions (max width: 1200px for blog images)
- **Compression**: Use tools like ImageOptim, TinyPNG, or Squoosh
- **File Size**: Aim for under 200KB per image
- **Naming**: Use descriptive, kebab-case names

### Image Dimensions
- **Hero/Feature Images**: 1200x630px (OpenGraph compatible)
- **Inline Images**: 800-1000px width
- **Diagrams**: As needed, but optimize file size

## Content Best Practices

### Writing Style
- **Practical Focus**: Share real experiences and lessons learned
- **Clear Examples**: Include code snippets and practical demonstrations
- **Professional Tone**: Approachable but technical
- **Actionable**: Provide takeaways readers can apply

### SEO Optimization
- **Description**: Write compelling 155-character meta descriptions
- **Headers**: Use descriptive H2/H3 headings with keywords
- **URLs**: Keep URLs clean (handled automatically via filename)
- **Links**: Include relevant internal links to other posts when appropriate

### Accessibility
- **Alt Text**: Describe what's in the image, not just "image" or "screenshot"
- **Headings**: Maintain proper hierarchy (don't skip levels)
- **Links**: Use descriptive link text (avoid "click here")
- **Code Blocks**: Specify language for proper syntax highlighting

## Draft Management

### Working with Drafts
- Set `draft: true` in frontmatter to hide from production
- Drafts are visible in development mode for preview
- Remove `draft: false` or omit field when ready to publish

### Publishing Checklist
- [ ] Frontmatter complete and accurate
- [ ] Images optimized and added to `/public/assets/`
- [ ] Content proofread and reviewed
- [ ] Links tested and working
- [ ] Local preview reviewed
- [ ] Quality checks passed
- [ ] Draft flag removed or set to `false`

## Updating Existing Posts

### Minor Updates
- Fix typos, broken links, or small corrections
- No need to update `pubDatetime`
- Commit with descriptive message: `fix: update aws link in serverless post`

### Major Updates
- Substantial content changes or additions
- Consider adding update note at top of post
- Keep original `pubDatetime` for chronological order
- Commit with message: `update: add new section to serverless post`

## Content Ideas and Planning

### Post Types
- **Tutorials**: Step-by-step guides with code examples
- **Reviews**: Service/tool reviews with honest assessment
- **Career Advice**: Professional growth and lessons learned
- **Conference Recaps**: Takeaways from talks and events
- **Deep Dives**: Technical explorations of specific topics

### Content Sources
- Real work experiences and challenges solved
- AWS and serverless community discussions
- Speaking engagements and presentations
- New features and service announcements
- Reader questions and feedback
