import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Row, Col, Card, Typography } from 'antd'
import Image from 'next/image'
import { Container } from '@components/ui'
import { getSpanValue } from '@lib/GetArticleSpan'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import dayjs from 'dayjs'
import style from '../styles/Home.module.css'

export async function getStaticProps () {
	const mdFileNames = getMdFileFromDir('teck-blog')
	const mdFile = mdFileNames.map((fileName) => readFileFromFileName(fileName, 'teck-blog'))
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

	parseMarkdownContent.sort((a, b) => (dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? -1 : 1))

	return {
		props: {
			parseMarkdownContent
		}
	}
}
const Blog = ({
	parseMarkdownContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { Meta } = Card
	const { width } = useWindowDimensions()

	const { Title } = Typography
	return (
  <Container>
    <Row gutter={[48, 48]}>
      {parseMarkdownContent.map((mdContents, index) => (
        <Col
          key={index}
          span={getSpanValue(width)}
        >
          <Card hoverable>
            <Link
              href={`/blog/${mdContents.slug}`}
              key={index}
              passHref
            >
              <div>
                <Image
                  src={`/${mdContents.image}`}
                  alt="blog rogo"
                  width={500}
                  height={300}
                />
                <Meta
                  title={(
                    <Title
                      level={5}
                      ellipsis={false}
                      className={style.titleWrap}
                    >
                      {mdContents.title}
                    </Title>
                  )}
                  description={mdContents.description}
                />
              </div>
            </Link>
          </Card>
        </Col>
				))}
    </Row>
  </Container>
	)
}

export default Blog