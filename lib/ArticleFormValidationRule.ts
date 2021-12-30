export interface Values {
  title: string
  slug: string
  image: string
  body: string
}

type ErrorsMessage = Partial<Values>

export default function validate(values: Values) {
  const errors: ErrorsMessage = {}

  if (!values.title.length) {
    errors.title = 'タイトルが未入力'
  }
  if (!values.slug.length) {
    errors.slug = 'slugが未入力'
  }
  if (!values.image.length) {
    errors.image = '画像ファイル名が未入力'
  }
  if (!values.body.length) {
    errors.body = '本文が未入力'
  }
  return errors
}
