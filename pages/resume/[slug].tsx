import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile,
} from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo, BlogJsonLd } from 'next-seo'
import { ArticleContent } from '@components/article'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import style from '@styles/Article.module.css'

export async function getStaticPaths() {
  const mdFileNames = getMdFileFromDir('resume')
  const mdFile = mdFileNames.map((fileName) =>
    readFileFromFileName(fileName, 'resume')
  )
  const paths = mdFile.map((markdown) => {
    const parseMdContent = parseMdFile(markdown)

    return `/resume/${parseMdContent.data.slug}`
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const { slug } = context.params
  const mdFileContent = readFileFromFileName(`${slug}.md`, 'resume')
  const parseMdContent = parseMdFile(mdFileContent)

  return {
    props: {
      title: parseMdContent.data.title,
      content: parseMdContent.content,
      description: parseMdContent.data.description,
      tag: parseMdContent.data.tag,
      created_at: Date.parse(parseMdContent.data.created_at),
      slug,
    },
  }
}
const PostResume = ({
  title,
  content,
  description,
  tag,
  created_at,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const formatDate = dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')

  const downloadResume = async () => {
    const res = await fetch('/api/resume-download', {
      method: 'GET',
    })

    const texts: { resume: string } = await res.json()
    const a = document.createElement('a')
    a.download = 'tomita_resume.md'

    const blob = new Blob([texts.resume], { type: 'text/plain' })

    a.href = URL.createObjectURL(blob)
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <>
      <BlogJsonLd
        images={['./public/next.jpeg']}
        url={`https://nextjs-personal-blog-five.vercel.app/resume/${slug}`}
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
          type: 'article',
          title: title,
          description: `${content}`,
          images: [
            {
              url: './public/next.jpeg',
              width: 800,
              height: 600,
              alt: 'プレビュー画像',
            },
          ],
          article: {
            publishedTime: formatDate,
            tags: tag,
          },
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
      {/* <div className={style.downloadButton}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="middle"
          onClick={() => downloadResume()}
        >
          職務経歴書をダウンロード
        </Button>
      </div> */}
    </>
  )
}

export default PostResume
