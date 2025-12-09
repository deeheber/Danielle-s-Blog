import type { CollectionEntry } from "astro:content"

import getSortedBlog from "./getSortedBlogPosts"
import { slugifyAll } from "./slugify"

const getBlogByTag = (blog: CollectionEntry<"blog">[], tag: string) =>
  getSortedBlog(blog.filter((post) => slugifyAll(post.data.tags).includes(tag)))

export default getBlogByTag
