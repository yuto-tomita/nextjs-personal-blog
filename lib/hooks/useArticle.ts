import { useState } from 'react'
import type { Values } from '@lib/ArticleFormValidationRule'
import validate from '@lib/ArticleFormValidationRule'

export const useArticle = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [image, setImage] = useState<string>('')
  const [tag, setTag] = useState<string[]>([])
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState<Partial<Values>>({})

  /** Enterキーを押下したら任意の文字列をtag変数に追加する */
  const onHandleEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (
        (event.target as HTMLInputElement).value !== '' &&
        !tag.includes((event.target as HTMLInputElement).value)
      ) {
        setTag([...tag, (event.target as HTMLInputElement).value])
      }
    }
  }

  const postArticle = async () => {
    setErrors({})
    setErrors(validate({ title, slug, image, body }))

    if (
      Object.keys(validate({ title, slug, image, body })).length === 0
    ) {
      await fetch('/api/postArticle', {
        method: 'POST',
        body: JSON.stringify({ title, slug, image, tag, body })
      })
    }
  }

  return {
    setTitle,
    setSlug,
    setImage,
    postArticle,
    onHandleEnterKey,
    tag,
    errors,
    setBody,
    body
  }
}