import type { CollectionEntry } from "astro:content"

import postFilter from "./postFilter"
import { slugifyStr } from "./slugify"

interface Tag {
  tag: string
  tagName: string
}

const getUniqueTags = (blog: CollectionEntry<"blog">[]) => {
  const seen = new Set<string>()
  const tags: Tag[] = blog
    .filter(postFilter)
    .flatMap((post) => post.data.tags)
    .map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter((value) => {
      if (seen.has(value.tag)) return false
      seen.add(value.tag)
      return true
    })
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag))
  return tags
}

export default getUniqueTags
