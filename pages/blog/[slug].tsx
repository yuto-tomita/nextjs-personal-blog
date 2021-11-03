import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo, BlogJsonLd } from 'next-seo'

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
			created_at: parseMdContent.data.created_at,
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
  return (
		<div>
			<BlogJsonLd
				images={[
					'./public/next.jpeg'
				]}
				url={`https://nextjs-personal-blog-five.vercel.app/blog/${slug}`}
				title={title}
				datePublished={created_at}
				dateModified="2015-02-05T09:00:00+08:00"
				authorName="冨田 優斗"
				description={description}
			/>

			<p>Title: {title}</p>
			<p>Content: {content}</p>

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
						publishedTime: created_at,
						tags: tag
					}
        }}
      />
		</div>
	)
};

export default Post;