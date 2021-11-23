import Container from '@components/ui/Container'
import { useAuth } from '@lib/hooks/useAuth'

const Admin = () => {
	const { signInGithub } = useAuth()
	signInGithub()

	return (
		<Container>
			hoge
		</Container>
	)
}

export default Admin