import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAuth } from '@lib/hooks/useAuth'
import { Container } from '@components/ui'
import { Input, Button } from 'antd'
import { MarkdownPreview } from '@components/article'
import style from '@styles/Article.module.css'

const ArticleCreate: NextPage = () => {
  const { navigationGuard } = useAuth()
  const { TextArea } = Input
  const [value, setValue] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    navigationGuard()
  }, [])

  const switchPreview = () => setPreview(true)
  const switchWriting = () => setPreview(false)

  const postArticle = async () => {
    await fetch('/api/postArticle', {
      method: 'POST',
      body: value
    })
  }

  return (
    <Container>
      <div className={style.switchPreview}>
        <span
          className={preview ? style['notActive'] : style['active']}
          onClick={() => switchWriting()}
        >
          Writing
        </span>
        <span className={style.blank}>|</span>
        <span
          className={preview ? style['active'] : style['notActive']}
          onClick={() => switchPreview()}
        >
          Preview
        </span>
      </div>
      <div className={style.articleCreateWrapper}>
        {preview ? (
          <div className={style.previewArea}>
            <MarkdownPreview markdownContent={value} />
          </div>
        ) : (
          <div>
            <div className={style.writingArea}>
              <TextArea
                onChange={(e) => setValue(e.target.value)}
                autoSize={{ minRows: 20 }}
                value={value}
              />
            </div>
            <div className={style.submitButton}>
              <Button type="primary" onClick={postArticle}>
                記事投稿
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ArticleCreate
