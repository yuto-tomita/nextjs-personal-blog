import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, parseMdFile } from '@lib/GetMdfile'

export async function getStaticProps () {
	const mdFiles = getMdFileFromDir()
	const parseHtmlElement = parseMdFile(mdFiles)
	return {
		props: {
			mdFiles
		}
	}
}
const Blog = ({
	mdFiles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div>
			{
				mdFiles.map(fileName => {
					return 
				})
			}
		</div>
	)
}

export default Blog