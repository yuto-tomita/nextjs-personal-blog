import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Row, Col, Card } from 'antd'
import Image from 'next/image'
import { Container } from '@components/ui'

export async function getStaticProps () {
	const mdFileNames = getMdFileFromDir('teck-blog')
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName, 'teck-blog'))
	const parseMarkdownContent = mdFile.map(markdown => {
		const parseMdContent = parseMdFile(markdown)

		return {
			title: parseMdContent.data.title,
			content: parseMdContent.content,
			slug: parseMdContent.data.slug,
			image: parseMdContent.data.image,
			description: parseMdContent.data.description
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
	const { Meta } = Card
	return (
		<Container>
			<Row gutter={[48, 48]}>
				{parseMarkdownContent.map((mdContents, index) => (
					<Col key={index} span={8}>
						<Card hoverable>
							<Link href={`/blog/${mdContents.slug}`} key={index} passHref>
								<div>
									<Image src={`/${mdContents.image}`} alt="blog rogo" width={500} height={300} />
									<Meta title={mdContents.title} description={mdContents.description} />
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