import { Container } from '@components/ui'
import { ADMIN_TABLE_CONSTANT } from '@lib/constant/AdminTableConstant'
import { Table, Button } from 'antd'
import { useAuth } from '@lib/hooks/useAuth'
import { useEffect } from 'react'
import style from '@styles/Admin.module.css'
import Router from 'next/router'

const Admin = () => {
  const { navigationGuard, isExistSession, signInGithub } = useAuth()

  useEffect(() => {
    if (isExistSession()) {
      navigationGuard()
    } else {
      signInGithub()
    }
  }, [])

  const navigateToArticleCreatePage = () => {
    Router.push('/article_create')
  }

  const data = [
    {
      key: 1,
      title: 'hoge',
      description: 'hogehoge',
      tag: 'vue',
      viewCount: 12
    }
  ]

  return (
    <Container>
      <div className={style.buttonPosition}>
        <Button type="primary" onClick={() => navigateToArticleCreatePage()}>
          記事投稿
        </Button>
      </div>
      <Table columns={ADMIN_TABLE_CONSTANT} dataSource={data} />
    </Container>
  )
}

export default Admin
