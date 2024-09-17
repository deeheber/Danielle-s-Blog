import type { CollectionEntry } from "astro:content"
import getsortedblog from "./getSortedBlogPosts"
import { slugifyAll } from "./slugify"

const getBlogByTag = (blog: CollectionEntry<"blog">[], tag: string) =>
  getsortedblog(blog.filter(post => slugifyAll(post.data.tags).includes(tag)))

export default getBlogByTag
