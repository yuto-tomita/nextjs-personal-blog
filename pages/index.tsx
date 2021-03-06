import React from 'react'
import type { InferGetStaticPropsType } from 'next'
import {
  getMdFileFromDir,
  readFileFromFileName,
  parseMdFile,
} from '@lib/MdFileOperation'
import Link from 'next/link'
import { Container } from '@components/ui'
import { Row, Col, Card, Typography } from 'antd'
import Image from 'next/image'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import style from '../styles/Home.module.css'
import { getSpanValue } from '@lib/hooks/useArticleSpan'
import { NextSeo } from 'next-seo'
import { profileMessage } from '@lib/constant/ProfileMessage'

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
  })

  try {
    return {
      props: {
        mdFileNames,
        parseMarkdownContent,
      },
    }
  } catch (e) {
    return {
      props: {
        mdFileNames,
        parseMarkdownContent,
      },
    }
  }
}

const Home = ({
  mdFileNames,
  parseMarkdownContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { Meta } = Card
  const { width } = useWindowDimensions()
  const articleTitle = mdFileNames.map((val) => val.replace(/.md/g, ''))
  const { Title } = Typography

  const getAccessToken = new URL(window.location.href).hash
  if (getAccessToken.length) {
    const startIndex = getAccessToken.indexOf('=')
    const endIndex = getAccessToken.indexOf('&')
    const token = getAccessToken.slice(startIndex + 1, endIndex)

    localStorage.setItem('accessToken', token)
  }

  const texts = profileMessage.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item.match(/\n/) ? <br /> : item}
      </React.Fragment>
    )
  })

  return (
    <>
      <NextSeo description={profileMessage} />
      <Container>
        <div className={style.selfIntroduction}>
          <div>
            <h1 className={style.title}>???????????????!</h1>
            <p className={style.selfContents}>{texts}</p>
          </div>
          <div className={style.image}>
            <Image
              src="/MyProfileImage.jpg"
              alt="my profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h1>resume</h1>
        {/* ?????????????????????????????????????????????????????????????????????????????? */}
        {/* ???????????????????????????????????????????????????????????????????????? */}
        <Row gutter={[48, 48]}>
          {parseMarkdownContent.map((mdContents, index) => (
            <Col key={index} span={getSpanValue(width)}>
              <Card
                hoverable
                title={articleTitle[index]}
                style={{ width: 400 }}
              >
                <Link href={`/resume/${mdContents.slug}`} key={index} passHref>
                  <div>
                    {mdContents.image ? (
                      <Image
                        src={`/${mdContents.image}`}
                        alt="blog rogo"
                        width={500}
                        height={300}
                      />
                    ) : (
                      <></>
                    )}
                    <Meta
                      title={
                        <Title
                          level={5}
                          ellipsis={false}
                          className={style.titleWrap}
                        >
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
        <h1>???????????????</h1>
        <p>coming soon...</p>
      </Container>
    </>
  )
}

export default Home
