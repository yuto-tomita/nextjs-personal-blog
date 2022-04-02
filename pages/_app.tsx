import { useEffect, useState, Suspense } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Head, Header, Footer } from '@components/common'
import 'antd/dist/antd.css'
import style from '@styles/App.module.css'
import Router from 'next/router'
import { ReactRelayContext } from 'react-relay'
import { useEnvironment } from '../lib/relay'

function MyApp({ Component, pageProps }: AppProps) {
  // ant-designのMenuコンポーネントを使用するにはSSRだとエラーが起きるため画面に要素が描画されてからコンポーネントを描画するようにする
  const [showComponent, setShowComponent] = useState(false)
  const environment = useEnvironment(pageProps.intialRecords)

  useEffect(() => {
    setShowComponent(true)

    if (process.env.NODE_ENV === 'development') {
      Router.prefetch('/home')
      Router.prefetch('/blog')
      Router.prefetch('/contact')
    }
  }, [])

  if (showComponent) {
    return (
      <ReactRelayContext.Provider value={{ environment }}>
        <>
          <Head />
          <div className={style.appContent}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </>
      </ReactRelayContext.Provider>
    )
  } else {
    return null
  }
}

export default MyApp
