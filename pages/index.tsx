import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Container } from '@components/ui'
import { Row, Col, Card, Typography } from 'antd'
import Image from 'next/image'
import { useWindowDimensions } from '@lib/hooks/DetectScreenSize'
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
      mdFileNames,
			parseMarkdownContent
		}
	}
}

const Home = ({
  mdFileNames,
  parseMarkdownContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { Meta } = Card
  const { width } = useWindowDimensions()

  const getSpanValue = () => {
    console.log(width)
    // if (width < 950) {
    //   return 12
    // } else if (width < 1200) {
    //   return 24
    // } else {
    //   return 8
    // }

    if (width > 1200) {
      return 8
    } else if (width > 950) {
      return 12
    } else {
      return 24
    }
    // return width < 950 ? 24 : 8
  }
  const articleTitle = mdFileNames.map(val => val.replace(/.md/g, ''))
  const { Title } = Typography

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
      {/* カードタイトルが長文の場合もすべて表示するようにする */}
      {/* カードタイトルの文字の大きさをもう少し大きくする */}
      <Row gutter={[48, 48]}>
        {parseMarkdownContent.map((mdContents, index) => (
					<Col key={index} span={getSpanValue()}>
						<Card
              hoverable
              title={articleTitle[index]}
              style={{width: 400}}
            >
							<Link
                href={`/blog/${mdContents.slug}`}
                key={index}
                passHref
              >
								<div>
									<Image
                    src={mdContents.image ? `/${mdContents.image}` : '/next.jpeg'}
                    alt="blog rogo"
                    width={500}
                    height={300}
                  />
									<Meta
                    title={
                      <Title level={5} ellipsis={false} className={style.titleWrap} >
                        {mdContents.title}
                      </Title>
                    }
                    className={style.cardStyle}
                    description={mdContents.description}
                  />
								</div>
							</Link>
						</Card>
					</Col>
				))}
      </Row>
    </Container>
  )
}

export default Home
