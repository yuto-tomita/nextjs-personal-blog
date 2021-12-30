import type { InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import { useAuth } from '@lib/hooks/useAuth'
import { Container } from '@components/ui'
import { Input, Button, Select } from 'antd'
import { MarkdownPreview } from '@components/article'
import style from '@styles/Article.module.css'
import { useArticle } from '@lib/hooks/useArticle'
import fs from 'fs'
import { join } from 'path'
import { SelectValue } from 'antd/lib/select'

export async function getStaticProps() {
  const publicDirFiles = fs.readdirSync(join(process.cwd(), 'public'))
  const filterImageFile = publicDirFiles.filter(
    (val) => val.includes('png') || val.includes('jpeg')
  )

  return {
    props: {
      filterImageFile
    }
  }
}

const ArticleCreate = ({
  filterImageFile
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { Option } = Select
  const {
    postArticle,
    setTitle,
    setSlug,
    setImage,
    tag,
    onHandleEnterKey,
    errors
  } = useArticle()
  const { navigationGuard } = useAuth()
  const { TextArea } = Input
  const [value, setValue] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    navigationGuard()
  }, [])

  const switchPreview = () => setPreview(true)
  const switchWriting = () => setPreview(false)

  /** valueの型を特定してstrings型だったらstateを更新する */
  const typeParticularToSetImage = (value: SelectValue) => {
    if (typeof value === 'string') {
      setImage(value)
    }
  }

  const getErrorMessage = (key: 'title' | 'slug' | 'image') => {
    return <div className={style.error}>{errors[key]}</div>
  }

  return (
    <Container>
      <Input
        placeholder="title"
        onChange={(event) => setTitle(event.target.value)}
      />
      {getErrorMessage('title')}
      <Input
        placeholder="slug"
        onChange={(event) => setSlug(event.target.value)}
      />
      {getErrorMessage('slug')}
      <Select
        placeholder="image"
        onChange={(value) => typeParticularToSetImage(value)}
      >
        {filterImageFile.map((val, key) => (
          <Option value={val} key={key}>
            {val}
          </Option>
        ))}
      </Select>
      {getErrorMessage('image')}
      <Select
        placeholder="tag"
        mode="multiple"
        onInputKeyDown={(event) => onHandleEnterKey(event)}
      >
        {tag.map((val, key) => (
          <Option value={val} key={key}>
            {val}
          </Option>
        ))}
      </Select>
      <div className={style.formBlank} />
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
              <Button type="primary" onClick={() => postArticle()}>
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
