import { FC } from 'react'
import NextHead from 'next/head'

const Head: FC = () => {
	return (
		<>
			<NextHead>
				<title>とみーの個人ブログ</title>
				<meta name="google-site-verification" content="ddrRraQeMATOMed5-3KD2HIgTqnuT0FsXze03hiaNYI" />
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</NextHead>
		</>
	)
}

export default Head