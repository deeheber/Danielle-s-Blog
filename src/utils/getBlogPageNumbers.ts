import { SITE } from "@config"

const getPageNumbers = (numberOfblog: number) => {
  const numberOfPages = Math.ceil(numberOfblog / Number(SITE.postPerPage))
  return Array.from({ length: numberOfPages }, (_, i) => i + 1)
}

export default getPageNumbers
