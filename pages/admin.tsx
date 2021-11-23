import Container from '@components/ui/Container'
import { useAuth } from '@lib/hooks/useAuth'

const Admin = () => {
	const { signInGithub, guard } = useAuth()
	
	if (!guard()) {
		signInGithub()
	}

	return (
		<Container>
			<div>
				hoge
			</div>
		</Container>
	)
}

export default Admin