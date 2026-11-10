import type { CollectionEntry } from "astro:content"

import { SITE } from "@config"

// Same frame and colors as the site template (see ./site.tsx).
const PostOgTemplate = (post: CollectionEntry<"blog">) => {
  return (
    <div
      style={{
        background: "#ffffff",
        color: "#111111",
        fontFamily: "Inter",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "48px",
      }}
    >
      <div
        style={{
          border: "2px solid #111111",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px 48px",
        }}
      >
        <p
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
            maxHeight: "80%",
            overflow: "hidden",
          }}
        >
          {post.data.title}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 32,
          }}
        >
          <span style={{ color: "#6b6b6b" }}>by {post.data.author}</span>
          <span style={{ fontWeight: 700 }}>
            {new URL(SITE.website).hostname}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostOgTemplate
