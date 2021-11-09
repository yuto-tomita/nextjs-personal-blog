import type { NextPage } from 'next'
import { Container } from '@components/ui'
import { Input } from 'antd'
import { useMail } from '@lib/hooks/useMail'
import style from '../styles/Contact.module.css'

const Contact: NextPage = () => {
	const { setMail, setName, setSubject, setBody } = useMail()
	const { TextArea } = Input

	return (
		<Container>
			<div className={style.formContainer}>
				<label>件名</label>
				<Input
				  placeholder="件名を入力してください"
					allowClear
					onChange={(e) => setSubject(e.target.value)}
				/>
			</div>
			<div className={style.formContainer}>
				<label>メールアドレス</label>
				<Input
					placeholder="メールアドレスを入力してください"
					allowClear
					onChange={(e) => setMail(e.target.value)}
				/>
			</div>
			<div className={style.formContainer}>
				<label>名前</label>
				<Input
					placeholder="名前を入力してください"
					allowClear
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className={style.formContainer}>
				<label>お問い合わせ内容</label>
				<TextArea
					placeholder="お問い合わせ内容を入力してください"
					allowClear
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>
		</Container>
	)
}

export default Contact