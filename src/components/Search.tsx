import type { CollectionEntry } from "astro:content"
import Fuse from "fuse.js"
import React, { useCallback, useEffect, useState, useMemo } from "react"

import Card from "@components/Card"

export type SearchItem = {
  title: string
  description: string
  data: CollectionEntry<"blog">["data"]
  slug: string
}

interface Props {
  searchList: SearchItem[]
}

interface SearchResult {
  item: SearchItem
  refIndex: number
}

export default function SearchBar({ searchList }: Props) {
  const [inputVal, setInputVal] = useState<string | null>(null)
  const initializeInput = useCallback((input: HTMLInputElement | null) => {
    if (!input) return
    // The server-rendered field may already contain text when React attaches.
    const query = new URLSearchParams(window.location.search).get("q")
    setInputVal(input.value || query || "")
  }, [])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value)
  }

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description", "data.tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList],
  )

  const searchResults: SearchResult[] = useMemo(() => {
    return inputVal && inputVal.length > 1 ? fuse.search(inputVal) : []
  }, [inputVal, fuse])

  useEffect(() => {
    if (inputVal === null) return
    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set("q", inputVal)
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString()
      history.replaceState(history.state, "", newRelativePathQuery)
    } else {
      history.replaceState(history.state, "", window.location.pathname)
    }
  }, [inputVal])

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
          <span className="sr-only">Search writing</span>
        </span>
        <input
          className="bg-skin-fill focus-visible:outline-skin-fill placeholder:text-skin-muted block w-full rounded border py-3 pr-3 pl-10 placeholder:italic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          style={{
            // Muted token: 5.3:1 light / 6.7:1 dark, above the 3:1 needed for inputs
            borderColor: `rgb(var(--color-text-muted))`,
          }}
          placeholder="Search writing..."
          type="text"
          name="search"
          aria-label="Search writing"
          value={inputVal ?? ""}
          onChange={handleChange}
          autoComplete="off"
          ref={initializeInput}
        />
      </label>

      {inputVal && inputVal.length > 1 && (
        <div className="mt-8">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          {`for '${inputVal}'`}
        </div>
      )}

      <ul>
        {searchResults &&
          searchResults.map(({ item, refIndex }) => (
            <Card
              href={`/blog/${item.slug}/`}
              frontmatter={item.data}
              key={`${refIndex}-${item.slug}`}
            />
          ))}
      </ul>
    </>
  )
}
