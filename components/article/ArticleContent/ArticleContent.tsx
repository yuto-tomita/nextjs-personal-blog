import { FC } from 'react'
import { Container } from '@components/ui'
import { MarkdownPreview } from '@components/article'
import { Row, Col, Tag } from 'antd'
import Image from 'next/image'
import { getSpanValue } from '@lib/GetArticleSpan'
import style from '@styles/Article.module.css'
import { useState, useCallback } from 'react'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import { useScrollAmount } from '@lib/hooks/useScrollAmount'

interface Props {
  title: string
  content: string
  description: string
  tag: string[]
  created_at: number
  slug: string
}

const ArticleContent: FC<Props> = ({ title, content, tag }) => {
  const [onlyHeadings, setOnlyHeadings] = useState<
    HTMLHeadingElement[]
  >([])
  const { width, height } = useWindowDimensions()
  const { yaxisAmount } = useScrollAmount()

  const getOneHeadingTexts = () => {
    return onlyHeadings.map((val) => val.innerText)
  }

  const getActiveHeading = (index: number) => {
    const heddingOffsetTop = onlyHeadings.map((val) => val.offsetTop)
    if (heddingOffsetTop[index + 1]) {
      if (
        between(
          yaxisAmount,
          heddingOffsetTop[index],
          heddingOffsetTop[index + 1]
        )
      ) {
        return style.contentActive
      }
    } else if (
      between(yaxisAmount, heddingOffsetTop[index], height + 200)
    ) {
      return style.contentActive
    }
  }

  const between = (x: number, min: number, max: number) => {
    return x >= min && x <= max
  }

  const markdownRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const onlyHeadings = Array.from(node.querySelectorAll('h1'))
      setOnlyHeadings(onlyHeadings)
    }
  }, [])

  return (
    <Container
      style={{ background: 'rgb(248, 246, 246)', height: '100%' }}
    >
      <Row align="top" gutter={[8, 8]}>
        <Col span={getSpanValue(width) === 24 ? 24 : 5}>
          <div className={style.tagContentArea}>
            <p className={style.title}>Tag</p>
            <div className={style.content}>
              {tag.map((val: string, index: string | number) => {
                return <Tag key={index}>{val}</Tag>
              })}
            </div>
          </div>
        </Col>
        <Col span={getSpanValue(width) === 24 ? 24 : 13}>
          <div className={style.contentArea}>
            <p className={style.title}>{title}</p>
            <div className={style.content} ref={markdownRef}>
              <MarkdownPreview markdownContent={content} />
            </div>
          </div>
        </Col>
        <Col
          span={getSpanValue(width) === 24 ? 24 : 5}
          className={style.sticky}
        >
          <div className={style.tagContentArea}>
            <p className={style.title}>目次</p>
            <ul>
              {getOneHeadingTexts().map((text, index) => {
                return (
                  <li className={getActiveHeading(index)} key={index}>
                    {text}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={style.profileContentArea}>
            <div className={style.profileContainer}>
              <div className={style.profileImage}>
                <Image
                  src="/MyProfileImage.jpeg"
                  alt="my profile image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className={style.profileName}>冨田優斗</p>
              <p className={style.profileText}>
                受託とSESをやっている会社でフロントエンドエンジニアとして働いています。
                <br />
                <br />
                20歳の頃に新卒でIT業界に入り、業界3年目になります。
                <br />
                <br />
                普段の仕事ではVue.jsやLaravelを用いてtoB向けのソフトウェア開発を行なっております。
                <br />
                <br />
                Node.jsやReactを用いた開発に興味があります！
                <br />
                もし興味がございましたら、Contactページからメールいただけると幸いです。
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ArticleContent
