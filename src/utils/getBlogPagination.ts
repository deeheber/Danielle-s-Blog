import { SITE } from "@config"
import getPageNumbers from "./getBlogPageNumbers"

interface GetPaginationProps<T> {
  blog: T
  page: string | number
  isIndex?: boolean
}

const getPagination = <T>({
  blog,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(blog.length)
  const totalPages = totalPagesArray.length

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0

  const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage
  const startPost = isIndex ? 0 : lastPost - SITE.postPerPage
  const paginatedblog = blog.slice(startPost, lastPost)

  return {
    totalPages,
    currentPage,
    paginatedblog,
  }
}

export default getPagination
