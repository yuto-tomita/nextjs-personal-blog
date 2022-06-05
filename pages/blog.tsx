import type { InferGetStaticPropsType } from 'next'
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile,
} from '@lib/MdFileOperation'
import { Container, List, Pagination } from '@components/ui'
import dayjs from 'dayjs'
import { useState } from 'react'
import style from 'styles/Blog.module.css'

export async function getStaticProps() {
  const mdFileNames = getMdFileFromDir('teck-blog')
  const mdFile = mdFileNames.map((fileName) =>
    readFileFromFileName(fileName, 'teck-blog')
  )
  const parseMarkdownContent = mdFile.map((markdown) => {
    const parseMdContent = parseMdFile(markdown)

    return {
      title: parseMdContent.data.title,
      content: parseMdContent.content,
      slug: parseMdContent.data.slug,
      image: parseMdContent.data.image,
      description: parseMdContent.data.description,
      created_at: Date.parse(parseMdContent.data.created_at),
    }
  })

  parseMarkdownContent.sort((a, b) =>
    dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? -1 : 1
  )

  return {
    props: {
      parseMarkdownContent,
    },
  }
}
const Blog = ({
  parseMarkdownContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pagination, usePagination] = useState(1)

  const slicePostArticles = parseMarkdownContent.slice(
    (pagination - 1) * 10,
    10 * pagination
  )

  const listTitles = slicePostArticles.map((val) => {
    return {
      title: String(val.title),
      description: String(val.description),
      href: val.slug,
      created_at: dayjs(val.created_at).format('YYYY-MM-DD'),
    }
  })

  return (
    <Container>
      <List articleInfo={listTitles} />
      <Pagination
        className={style.topMargin}
        currentPage={pagination}
        onClick={usePagination}
        data={parseMarkdownContent}
      />
    </Container>
  )
}

export default Blog
