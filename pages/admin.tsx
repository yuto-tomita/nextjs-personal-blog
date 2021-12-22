import Container from '@components/ui/Container'
import { ADMIN_TABLE_CONSTANT } from '@lib/constant/AdminTableConstant'
import { Table } from 'antd'
import { useAuth } from '@lib/hooks/useAuth'

const Admin = () => {
	const { session, signInGithub } = useAuth()

	if (!session) {
		signInGithub()
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
    <Table
      columns={ADMIN_TABLE_CONSTANT}
      dataSource={data}
    />
  </Container>
	)
}

export default Admin