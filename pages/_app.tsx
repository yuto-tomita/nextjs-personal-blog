import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Head, Header } from '@/components/common'
import 'antd/dist/antd.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Header></Header>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
