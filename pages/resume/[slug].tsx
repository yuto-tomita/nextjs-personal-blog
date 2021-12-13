/* eslint-disable react/no-children-prop */
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'
import { useState, useCallback } from 'react'
import { NextSeo, BlogJsonLd } from 'next-seo'
import { Container } from '@components/ui'
import { Row, Col, Tag } from 'antd'
import dayjs from 'dayjs'
import style from '../../styles/Article.module.css'
import { getSpanValue } from '@lib/GetArticleSpan'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { useScrollAmount } from '@lib/hooks/useScrollAmount'

export async function getStaticPaths () {
	const mdFileNames = getMdFileFromDir('resume')
	const mdFile = mdFileNames.map((fileName) => readFileFromFileName(fileName, 'resume'))
	const paths = mdFile.map((markdown) => {
		const parseMdContent = parseMdFile(markdown)

		return `/resume/${parseMdContent.data.slug}`
	})

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps (context: any) {
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
			slug
		}
	}
}
const PostResume = ({
	title,
	content,
	description,
	tag,
	created_at,
	slug
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const formatDate = dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')
	const [onlyHeadings, setOnlyHeadings] = useState<HTMLHeadingElement[]>([])
	const { width, height } = useWindowDimensions()
	const { yaxisAmount } = useScrollAmount()

	const getOneHeadingTexts = () => {
		return onlyHeadings.map((val) => val.innerText)
	}
	const getActiveHeading = (index: number) => {
		const heddingOffsetTop = onlyHeadings.map((val) => val.offsetTop)
		if (heddingOffsetTop[index + 1]) {
			if (between(yaxisAmount, heddingOffsetTop[index], heddingOffsetTop[index + 1])) {
				return style.contentActive
			}
		} else if (between(yaxisAmount, heddingOffsetTop[index], height + 200)) {
			return style.contentActive
		}
	}
	const between = (x: number, min: number, max: number) => {
		return x >= min && x <= max;
	}
	const testRef = useCallback((node: HTMLElement | null) => {
		if (node) {
			const onlyHeadings = Array.from(node.querySelectorAll('h1'))
			setOnlyHeadings(onlyHeadings)
		}
	}, [])

  return (
    <>
      <BlogJsonLd
        images={[
					'./public/next.jpeg'
				]}
        url={`https://nextjs-personal-blog-five.vercel.app/blog/${slug}`}
        title={title}
        datePublished={formatDate}
        dateModified="2015-02-05T09:00:00+08:00"
        authorName="冨田 優斗"
        description={description}
      />
      <NextSeo
        title={title}
        description={description}
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
						tags: tag
					}
				}}
      />
      <Container
        style={{background: 'rgb(248, 246, 246)', height: '100%'}}
      >
        <Row
          align="top"
          gutter={[8, 8]}
        >
          <Col span={getSpanValue(width) === 24 ? 24 : 5}>
            <div className={style.tagContentArea}>
              <p className={style.title}>
                Tag
              </p>
              <div className={style.content}>
                {
									tag.map((val: string, index: string | number) => {
										return <Tag key={index}>{val}</Tag>
									})
								}
              </div>
            </div>
          </Col>

          <Col span={getSpanValue(width) === 24 ? 24 : 13}>
            <div className={style.contentArea}>
              <p className={style.title}>
                {title}
              </p>
              <div
                className={style.content}
                ref={testRef}
              >
                <ReactMarkdown 
                  children={content}
                  components={{
										code ({node, inline, className, children, ...props}) {
											const match = /language-(\w+)/.exec(className || '')
											return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={base16AteliersulphurpoolLight}
                          language={match[1]}
                        />
                      ) : (
                        <code
                          className={className}
                          {...props}
                        >
                          {children}
                        </code>
											)
										}
									}}
                />
              </div>
            </div>
          </Col>

          <Col
            span={getSpanValue(width) === 24 ? 24 : 5}
            className={style.sticky}
          >
            <div className={style.tagContentArea}>
              <p className={style.title}>
                目次
              </p>
              <ul>
                {
									getOneHeadingTexts().map((text, index) => {
										return (
                      <li
                        className={getActiveHeading(index)}
                        key={index}
                      >
                        {text}
                      </li>
										)
									})
								}
              </ul>
            </div>

            <div className={style.profileContentArea}>
              <div className={style.profileContainer}>
                <div className={style.profileImage}>
                  <Image
                    src="/MyProfileImage.jpeg"
                    alt="my profile image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <p className={style.profileName}>
                  冨田優斗
                </p>

                <p className={style.profileText}>
                  受託とSESをやっている会社でフロントエンドエンジニアとして働いています。<br />
                  <br />
                  20歳の頃に新卒でIT業界に入り、業界3年目になります。<br />
                  <br />
                  普段の仕事ではVue.jsやLaravelを用いてtoB向けのソフトウェア開発を行なっております。
                  <br />
                  <br />
                  Node.jsやReactを用いた開発に興味があります！<br />
                  もし興味がございましたら、Contactページからメールいただけると幸いです。
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
	)
};

export default PostResume