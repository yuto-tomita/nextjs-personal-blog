import { FC, useState, useEffect, useRef } from 'react'
import { Container } from '@components/ui'
import { MarkdownPreview } from '@components/article'
import { Row, Col, Tag } from 'antd'
import Image from 'next/image'
import { getSpanValue } from '@lib/hooks/useArticleSpan'
import style from '@styles/Article.module.css'
import { useWindowDimensions } from '@lib/hooks/useDetectScreenSize'
import cn from 'classnames'

interface Props {
  title: string;
  content: string;
  description: string;
  tag: string[];
  created_at: number;
  slug: string;
}

const ArticleContent: FC<Props> = ({ title, content, tag }) => {
  const markdownRef = useRef<HTMLDivElement>(null)
  const ulElement = useRef<HTMLUListElement>(null)
  const [onlyHeadingsText, setOnlyHeadingsText] = useState<HTMLHeadingElement[]>([])
  const { width, height } = useWindowDimensions()

  const onIntersect = (
    entries: IntersectionObserverEntry[],
    currentViewHeadingIndex: number
  ) => {
    if (entries[0].isIntersecting) {
      const currentViewContent = ulElement.current?.getElementsByClassName(`${style.contentActive}`)
      if (currentViewContent && currentViewContent.length) {
        currentViewContent[0].classList.remove(style.contentActive)
      }

      const newActiveIndex = ulElement.current?.getElementsByClassName(`title_${currentViewHeadingIndex}`)
      if (newActiveIndex) {
        newActiveIndex[0].classList.add(style.contentActive)
      }
    }
  }

  useEffect(() => {
    const headingElements = markdownRef.current?.querySelectorAll('h1')
    
    if (headingElements) {
      setOnlyHeadingsText(Array.from(headingElements))
      const options = {
        root: null,
        rootMargin: '10% 0px -60% 0px',
        threshold: 0
      }

      headingElements.forEach((val, index) => {
        const observer = new IntersectionObserver((entries) => onIntersect(entries, index), options)
        observer.observe(val)
      })
    }
  }, [])

  const getOneHeadingTexts = () => {
    return onlyHeadingsText.map((val) => val.innerText)
  }

  return (
    <Container style={{ background: 'rgb(248, 246, 246)', height: '100%' }}>
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
            <p className={style.title}>
              {title}
            </p>
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
            <p className={style.title}>
              目次
            </p>
            <ul ref={ulElement}>
              {getOneHeadingTexts().map((text, index) => {
                return (
                  <li
                    key={index}
                    className={cn(`title_${index}`, style.listStyle)}
                  >
                    {/* <a href={text}>
                    </a> */}
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
                  src="/MyProfileImage.jpg"
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
