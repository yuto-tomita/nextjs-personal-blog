import { useState } from 'react'
import type { Values } from '@lib/ArticleFormValidationRule'
import validate from '@lib/ArticleFormValidationRule'

export const useArticle = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [image, setImage] = useState<string>('')
  const [tag, setTag] = useState<string[]>([])
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

  const postArticle = async (value: string) => {
    setErrors({})
    setErrors(validate({ title, slug, image }))

    if (!Object.keys(errors).length) {
      await fetch('/api/postArticle', {
        method: 'POST',
        body: value
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
    errors
  }
}
