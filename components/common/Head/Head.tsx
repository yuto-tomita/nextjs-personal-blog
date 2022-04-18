import { FC } from 'react'
import NextHead from 'next/head'
import config from '@config/next-seo.config'

const Head: FC = () => {
  return (
    <>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>とみーの個人ブログ</title>
        <meta
          name="google-site-verification"
          content="ddrRraQeMATOMed5-3KD2HIgTqnuT0FsXze03hiaNYI"
        />
      </NextHead>
    </>
  )
}

export default Head
