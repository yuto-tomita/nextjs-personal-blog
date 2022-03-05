import type { InferGetStaticPropsType } from 'next'
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile
} from '@lib/MdFileOperation'
import { Container, List } from '@components/ui'
import dayjs from 'dayjs'

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
      created_at: Date.parse(parseMdContent.data.created_at)
    }
  })

  parseMarkdownContent.sort((a, b) =>
    dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? -1 : 1
  )

  return {
    props: {
      parseMarkdownContent
    }
  }
}
const Blog = ({
  parseMarkdownContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const listTitles = parseMarkdownContent.map((val) => {
    return {
      title: String(val.title),
      description: String(val.description),
      href: val.slug,
      created_at: dayjs(val.created_at).format('YYYY-MM-DD')
    }
  })
  return (
    <Container>
      <List articleInfo={listTitles} />
    </Container>
  )
}

export default Blog
