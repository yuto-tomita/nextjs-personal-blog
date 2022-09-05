import type { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile,
} from '@lib/MdFileOperation'

export async function getStaticProps() {
  const mdFileNames = getMdFileFromDir('resume')
  const mdFile = mdFileNames.map((fileName) =>
    readFileFromFileName(fileName, 'resume')
  )
  const parseMarkdownContent = mdFile.map((markdown) => {
    const parseMdContent = parseMdFile(markdown)

    return {
      title: parseMdContent.data.title,
      content: parseMdContent.content,
      slug: parseMdContent.data.slug,
      image: parseMdContent.data.image,
      description: parseMdContent.data.description,
    }
  }).reverse()

  return {
    props: {
      parseMarkdownContent
    }
  }
}

const Resume = ({ parseMarkdownContent }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="w-6/12 m-auto mt-10">
        {
          parseMarkdownContent.map((val, index) => {
            return (
              <div key={index} className="mb-8">
                <h1 className="font-bold text-xl">
                  {val.slug}
                </h1>

                <p>{val.title}</p>
                <Link href={`/resume/${encodeURIComponent(val.slug)}`}>
                  <span className="ml-4 text-cyan-500 cursor-pointer">
                    &gt;&gt; 詳細
                  </span>
                </Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Resume