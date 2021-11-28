import Container from '@components/ui/Container'
import { useAuth } from '@lib/hooks/useAuth'
import { ADMIN_TABLE_CONSTANT } from '@lib/constant/AdminTableConstant'
import { Table } from 'antd'

const Admin = () => {
	const { signInGithub, guard } = useAuth()
	
	if (!guard()) {
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