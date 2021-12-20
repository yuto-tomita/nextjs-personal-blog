import { useEffect, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Head, Header, Footer } from '@components/common'
import 'antd/dist/antd.css'
import style from '@styles/App.module.css'

function MyApp ({ Component, pageProps }: AppProps) {
  // ant-designのMenuコンポーネントを使用するにはSSRだとエラーが起きるため画面に要素が描画されてからコンポーネントを描画するようにする
  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    setShowComponent(true)
  }, [])

  if (showComponent) {
    return (
      <>
        <Head />
        <div className={style.appContent}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </>
    )
  } else {
    return null
  }
}
export default MyApp