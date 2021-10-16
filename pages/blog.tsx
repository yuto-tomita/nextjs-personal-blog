import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'

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
		<div>
			{
				parseMarkdownContent.map((mdContents, index) => (
					<div key={index}>
						<Link href={`/blog/${mdContents.slug}`} key={index}>{mdContents.title}</Link>
					</div>
				))
			}
		</div>
	)
}

export default Blog