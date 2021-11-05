import type { InferGetStaticPropsType } from 'next'
import { getMdFileFromDir, readFileFromFileName, parseMdFile } from '@lib/MdFileOperation'
import Link from 'next/link'
import { Container } from '@components/ui'
import { Row, Col, Card, Typography } from 'antd'
import Image from 'next/image'
import { useWindowDimensions } from '@lib/hooks/DetectScreenSize'
import style from '../styles/Home.module.css'
import { getSpanValue } from '@lib/GetArticleSpan'
import { ProfilePageJsonLd } from 'next-seo'

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

  return (
    <>
      <ProfilePageJsonLd
        breadcrumb={[
          {
            position: 1,
            name: 'Home',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/'
          },
          {
            position: 2,
            name: 'Blog',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/blog'
          },
          {
            position: 3,
            name: 'Contact',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/contact'
          }
        ]}
      />
      <Container>
        <div className={style.selfIntroduction}>
          <div>
            <h1 className={style.title}>初めまして!</h1>
            <p className={style.selfContents}>
              冨田 優斗っていいます。<br />
              とある受託とSESをやっている会社でフロントエンドエンジニアとして働いています。<br />
              20歳の頃に新卒でIT業界に入り、現在業界3年目になります。
              JavaScript周りの開発が好きで、主にVue.jsを使って開発をしています。<br />
              趣味は、Githubでフロント周りの便利なライブラリを調べたり、teck系のブログを巡回していくのが好きです！<br />
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
