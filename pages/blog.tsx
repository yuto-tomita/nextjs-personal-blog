import type { NextPage } from 'next'
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
const Blog: NextPage = () => <div>test</div>

export default Blog