import type { NextPage } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import { Container } from '@components/ui'
import Image from 'next/image'
import style from '../styles/Home.module.css'

export async function getStaticProps () {
  const mdFileNames = getMdFileFromDir('resume')
	const mdFile = mdFileNames.map(fileName => readFileFromFileName(fileName, 'resume'))
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

const Home: NextPage = () => {
  return (
    <Container>
      <div className={style.selfIntroduction}>
        <div>
          <h1>初めまして!</h1>
          <p>
            冨田 優斗っていいます。<br />
            とある受託とSESをやっている会社でフロントエンドエンジニアとして働いています。<br />
            20歳の頃に新卒でIT業界に入り、現在業界3年目になります。<br />
            JavaScript周りの開発が好きで、主にVue.jsを使って開発をしています。<br />
            私の詳しい経歴が気になっていただけた方はresumeの方をご覧いただければと思います！
          </p>
        </div>

        <div className={style.image}>
          <Image
            src="/MyProfileImage.jpeg"
            alt="my profile image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h1>resume</h1>

      {/* // ../resumeからファイルを読み込んで、その内容を表示する */}
    </Container>
  )
}

export default Home
