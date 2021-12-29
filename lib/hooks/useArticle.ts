import { useState } from 'react'

export const useArticle = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [image, setImage] = useState('')
  const [tag, setTag] = useState<string[]>([])

  const onHandleEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (
        (<HTMLInputElement>event.target).value !== '' &&
        !tag.includes((<HTMLInputElement>event.target).value)
      ) {
        setTag([...tag, (<HTMLInputElement>event.target).value])
      }
    }
  }

  const postArticle = async (value: string) => {
    validate()

    await fetch('/api/postArticle', {
      method: 'POST',
      body: value
    })
  }

  const validate = () => {
    //
  }

  return {
    setTitle,
    setSlug,
    setImage,
    setTag,
    postArticle,
    onHandleEnterKey,
    tag
  }
}
