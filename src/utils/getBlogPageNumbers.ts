import { SITE } from "@config"

const getPageNumbers = (numberOfblog: number) => {
  const numberOfPages = numberOfblog / Number(SITE.postPerPage)

  let pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i]
  }

  return pageNumbers
}

export default getPageNumbers
