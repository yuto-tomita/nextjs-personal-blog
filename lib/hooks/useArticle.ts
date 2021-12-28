import { useState } from 'react'

export const useArticle = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [image, setImage] = useState('')
  const [tag, setTag] = useState([])

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
    postArticle
  }
}
