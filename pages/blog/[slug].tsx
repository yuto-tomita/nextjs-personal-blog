/* eslint-disable react/no-children-prop */
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo, BlogJsonLd } from 'next-seo'
import { Container } from '@components/ui'
import { Row, Col, Tag } from 'antd'
import dayjs from 'dayjs'
import style from '../../styles/Article.module.css'
import { getSpanValue } from '@lib/GetArticleSpan'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export async function getStaticPaths () {
	const mdFileNames = getMdFileFromDir('teck-blog')
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName, 'teck-blog'))
	const paths = mdFile.map(markdown => {
		const parseMdContent = parseMdFile(markdown)

		return `/blog/${parseMdContent.data.slug}`
	})

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps (context: any) {
	const { slug } = context.params
	const mdFileContent = readFileFromFileName(`${slug}.md`, 'teck-blog')
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
	const [isButtonActive, setIsButtonActive] = useState(false)
	const { width } = useWindowDimensions()

	const changeButtonStatus = () => {
		if (isButtonActive) {
			setIsButtonActive(false)
		} else {
			setIsButtonActive(true)
		}
	}
	const getStarIcon = () => {
		if (isButtonActive) {
			return <StarFilled className={style.starButtonActive} />
		} else {
			return <StarOutlined className={style.starButton} />
		}
	}

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
					<Col span={getSpanValue(width) === 24 ? 24 : 2}>
						<div className={style.startButtonContainer}>
							<div onClick={changeButtonStatus}>
								{getStarIcon()}
							</div>
						</div>
					</Col>

					<Col
						span={getSpanValue(width) === 24 ? 24 : 15}
						className={style.contentArea}
					>
						<h1 className={style.title}>
							{title}
						</h1>
						<div className={style.content}>
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
												// PreTag="div"
												// {...props}
											/>
										) : (
											<code className={className} {...props}>
												{children}
											</code>
										)
									}
								}}
							/>
						</div>
					</Col>

					<Col
						span={getSpanValue(width) === 24 ? 24 : 6}
						className={style.tagContentArea}
					>
						<h1 className={style.title}>
							Tag
						</h1>
						<div className={style.content}>
							{
								tag.map((val: string, index: string | number) => {
									return <Tag key={index}>{val}</Tag>
								})
							}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
};

export default Post;