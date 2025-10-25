import rss from "@astrojs/rss"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"
import { getCollection } from "astro:content"
import getSortedBlog from "@utils/getSortedBlogPosts"
import { SITE } from "@config"

export async function GET() {
  const blog = await getCollection("blog")
  const sortedblog = getSortedBlog(blog)
  const parser = new MarkdownIt()

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedblog.map(({ body, data, slug }) => ({
      ...data,
      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      link: `blog/${slug}/`,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  })
}
