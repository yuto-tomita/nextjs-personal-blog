/* eslint-disable react/no-children-prop */
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile
} from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo, BlogJsonLd } from 'next-seo'
import dayjs from 'dayjs'
import { ArticleContent } from '@components/article'

export async function getStaticPaths() {
  const mdFileNames = getMdFileFromDir('teck-blog')
  const mdFile = mdFileNames.map((fileName) =>
    readFileFromFileName(fileName, 'teck-blog')
  )
  const paths = mdFile.map((markdown) => {
    const parseMdContent = parseMdFile(markdown)

    return `/blog/${parseMdContent.data.slug}`
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context: any) {
  const { slug } = context.params
  const mdFileContent = readFileFromFileName(
    `${slug}.md`,
    'teck-blog'
  )
  const parseMdContent = parseMdFile(mdFileContent)

  return {
    props: {
      title: parseMdContent.data.title,
      content: parseMdContent.content,
      description: parseMdContent.data.description,
      tag: parseMdContent.data.tag,
      created_at: Date.parse(parseMdContent.data.created_at),
      slug
    }
  }
}

const Post = ({
  title,
  content,
  description,
  tag,
  created_at,
  slug
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const formatDate = dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')

  const blogUrl = `https://nextjs-personal-blog-five.vercel.app/blog/${slug}`

  return (
    <>
      <BlogJsonLd
        images={['./public/next.jpeg']}
        url={blogUrl}
        title={title}
        datePublished={formatDate}
        dateModified="2015-02-05T09:00:00+08:00"
        authorName="冨田 優斗"
        description={content}
      />
      <NextSeo
        title={title}
        description={content}
        openGraph={{
          url: blogUrl,
          type: 'article',
          title: title,
          description: `${content}`,
          images: [
            {
              url: '/next.jpeg',
              width: 800,
              height: 600,
              alt: 'プレビュー画像'
            }
          ],
          article: {
            publishedTime: formatDate,
            tags: tag
          }
        }}
      />
      <ArticleContent
        title={title}
        content={content}
        description={description}
        tag={tag}
        created_at={created_at}
        slug={slug}
      />
    </>
  )
}

export default Post
