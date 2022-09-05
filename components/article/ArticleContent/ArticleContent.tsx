import { FC, useState, useEffect, useRef } from 'react'
import { Container, Text } from '@components/ui'
import { MarkdownPreview } from '@components/article'
// import { Row, Col, Tag } from 'antd
import Image from 'next/image'
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

  /** スクロール量に応じて、目次の色を変える処理 */
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
    <Container style={{ background: 'rgb(248, 246, 246)' }}>
      <div className="flex gap-2">
        <div className="bg-white rounded-xl pb-4 h-full w-60">
          <Text variant="title" className="text-center py-5">
            Tag
          </Text>
          <div className="flex flex-col whitespace-nowrap mt-2 ml-2">
            {tag.map((val: string, index: string | number) => {
              return (
                <span key={index}>{val}</span>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl mr-2 pb-4">
          <Text variant="title" className="text-center py-5">
            {title}
          </Text>
          <div className="mx-8" ref={markdownRef}>
            <MarkdownPreview markdownContent={content} />
          </div>
        </div>
        
        {/* stickyを効かせるため、空divを挿入 */}
        <div>
          <div className="sticky top-0">
            <div className="bg-white rounded-xl pb-4">
              <Text variant="title" className="text-center py-5">
                目次
              </Text>
              <ul ref={ulElement}>
                {getOneHeadingTexts().map((text, index) => {
                  return (
                    <li
                      key={index}
                      className={cn(`title_${index}`, 'list-none mt-2 ml-5')}
                    >
                      {text}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-white rounded-lg py-4 mt-4">
              <div className="rounded-full overflow-hidden w-32 h-32 relative mx-auto">
                <Image
                  src="/MyProfileImage.jpg"
                  alt="my profile image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="font-bold mt-4 text-center">
                冨田優斗
              </p>
              <p className="text-xs mx-5">
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
        </div>
      </div>
    </Container>
  )
}

export default ArticleContent
