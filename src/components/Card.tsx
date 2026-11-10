import type { CollectionEntry } from "astro:content"

import { slugifyStr } from "@utils/slugify"

import Datetime from "./Datetime"

export interface Props {
  href?: string
  frontmatter: CollectionEntry<"blog">["data"]
  secHeading?: boolean
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime } = frontmatter

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg leading-snug font-medium",
  }

  return (
    <li className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <a
        href={href}
        className="text-skin-accent underline-offset-4 hover:underline hover:decoration-2 focus-visible:underline [@media(hover:none)]:underline"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        className="shrink-0"
      />
    </li>
  )
}
