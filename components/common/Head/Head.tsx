import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'

const Head: FC = () => {
	return (
  <>
    <DefaultSeo {...config} />
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