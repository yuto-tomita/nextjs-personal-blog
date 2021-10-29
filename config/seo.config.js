// eslint-disable-next-line import/no-anonymous-default-export
export default {
  titleTemplate: '%s | とみーの個人ブログ',
  defaultTitle: 'タイトル | とみーの個人ブログ',
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: '冨田優斗',
    },
    {
      name: 'application-name',
      content: 'とみーの個人ブログ',
    },
  ],
  openGraph: {
    url: 'https://nextjs-personal-blog-five.vercel.app/',
    type: 'website',
    locale: 'ja_JP',
    site_name: 'とみーの個人ブログ',
  },
  twitter: {
    handle: '@hogehoge',
    site: '@fugafuga',
    cardType: 'summary_large_image',
  }
}