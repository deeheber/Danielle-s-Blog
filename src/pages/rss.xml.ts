import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import getsortedblog from "@utils/getSortedBlogPosts"
import { SITE } from "@config"

export async function GET() {
  const blog = await getCollection("blog")
  const sortedblog = getsortedblog(blog)
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedblog.map(({ data, slug }) => ({
      link: `blog/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  })
}
