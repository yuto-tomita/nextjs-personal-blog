import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/GetMdfile'

export async function getStaticProps () {
	const mdFileNames = getMdFileFromDir()
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName))
	const parseMarkdownContent = mdFile.map(markdown => {
		const parseMdContent = parseMdFile(markdown)
		return {
			title: parseMdContent.data.title,
			content: parseMdContent.content
		}
	})

	return {
		props: {
			mdFileNames,
			mdFile,
			parseMarkdownContent
		}
	}
}
const Blog = ({
	mdFileNames,
	mdFile,
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