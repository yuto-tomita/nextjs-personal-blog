import { getMdFileFromArticleDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'

export async function getStaticPaths () {
	const mdFileNames = getMdFileFromArticleDir()
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName, '_posts'))
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
	const mdFileContent = readFileFromFileName(`${slug}.md`, '_posts')
	const parseMdContent = parseMdFile(mdFileContent)

	return {
		props: {
			title: parseMdContent.data.title,
			content: parseMdContent.content
		}
	}
}

const Post = ({
	title,
	content
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
		<div>
			<p>Title: {title}</p>
			<p>Content: {content}</p>
		</div>
	)
};

export default Post;