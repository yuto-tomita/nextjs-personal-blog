import Container from '@components/ui/Container'
import { ADMIN_TABLE_CONSTANT } from '@lib/constant/AdminTableConstant'
import { Table } from 'antd'
import { useAuth } from '@lib/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Admin = () => {
	const router = useRouter()
	const { signInGithub, session } = useAuth()

	useEffect(() => {
		// if (session)と記述するとsessionStateが初期化され無限ループが発生するためisExistSessionメソッドを挟む
		if (session === null) {
			signInGithub()
		} else {
			if (session.user?.email !== 'qualidea01@gmail.com') {
				router.push('/')
			}
		}
	}, [])
	
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
    <Table
      columns={ADMIN_TABLE_CONSTANT}
      dataSource={data}
    />
  </Container>
	)
}

export default Admin