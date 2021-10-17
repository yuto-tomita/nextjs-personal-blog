import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Row, Col, Card } from 'antd'
import Image from 'next/image'
import { Container } from '@components/ui'

export async function getStaticProps () {
	const mdFileNames = getMdFileFromDir()
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName))
	const parseMarkdownContent = mdFile.map(markdown => {
		const parseMdContent = parseMdFile(markdown)

		return {
			title: parseMdContent.data.title,
			content: parseMdContent.content,
			slug: parseMdContent.data.slug,
			image: parseMdContent.data.image
		}
	})

	return {
		props: {
			parseMarkdownContent
		}
	}
}
const Blog = ({
	parseMarkdownContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<Container>
			<Row gutter={[48, 48]}>
				{parseMarkdownContent.map((mdContents, index) => (
					<Col key={index} span={8}>
						<Card hoverable>
							<Image src={`/${mdContents.image}`} alt="blog rogo" width={500} height={300} />
							<Link href={`/blog/${mdContents.slug}`} key={index}>{mdContents.title}</Link>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default Blog