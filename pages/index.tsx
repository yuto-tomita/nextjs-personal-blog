import React from 'react'
import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Container } from '@components/ui'
import { Row, Col, Card, Typography } from 'antd'
import Image from 'next/image'
import { useWindowDimensions } from '@lib/hooks/DetectScreenSize'
import style from '../styles/Home.module.css'
import { getSpanValue } from '@lib/GetArticleSpan'
import { NextSeo } from 'next-seo'

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

  const articleTitle = mdFileNames.map(val => val.replace(/.md/g, ''))
  const { Title } = Typography

  const description = `
    初めまして！冨田 優斗と申します。

    現在、受託とSESをやっている会社でフロントエンドエンジニアとして働いています。
    20歳の頃に新卒でIT業界に入り、現在業界3年目になります。

    仕事では主にVue.jsを使ってtoC向けのwebアプリを開発しています。
    過去にはLaravelを使用してAPI開発と認証認可システムを作成しました。
    Node.jsを使用したバックエンド開発とReactを用いたフロントエンドの開発に興味があります。
  
    趣味でGithubでフロント周りの便利なライブラリを調べたり、
    個人開発で気になっているライブラリやフレームワークを余暇で触っています。

    私の詳しい経歴が気になっていただけた方はresumeの方をご覧いただければと思います！
  `

  const texts = description.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        { item.match(/\n/) ? <br /> : item }
      </React.Fragment>
    )
  })

  return (
    <>
      <NextSeo
        description={description}     
      />

      <Container>
        <div className={style.selfIntroduction}>
          <div>
            <h1 className={style.title}>初めまして!</h1>
            <p className={style.selfContents}>
              { texts }
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
            <Col key={index} span={getSpanValue(width)}>
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

        <div>
          <h1>個人開発物</h1>

          <p>coming soon...</p>
        </div>
      </Container>
    </>
  )
}

export default Home
