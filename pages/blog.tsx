import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile, getSlug } from '@lib/MdFileOperation'

export async function getStaticProps () {
	const mdFileNames = getMdFileFromDir()
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName))
	const parseMarkdownContent = mdFile.map(markdown => {
		const parseMdContent = parseMdFile(markdown)
		console.log(parseMdContent)
		return {
			title: parseMdContent.data.title,
			content: parseMdContent.content,
			slug: parseMdContent.data.slug
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
					<div key={index}>{mdContents.title}</div>
				))
			}
		</div>
	)
}

export default Blog