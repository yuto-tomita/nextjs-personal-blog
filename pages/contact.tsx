import type { NextPage } from 'next'
import { Container } from '@components/ui'
import { Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useMail } from '@lib/hooks/useMail'
import { useState } from 'react'
import style from '../styles/Contact.module.css'

const Contact: NextPage = () => {
	const {
		setMail,
		setName,
		setSubject,
		setBody,
		send,
		errorMessage
	} = useMail()
	const [displayErrorMessage, setDisplayErrorMessage] = useState(false) 
	const { TextArea } = Input
	
	const sendBackConfirmation = () => {
		setDisplayErrorMessage(false)

		if (!Object.values(errorMessage()).some((val) => typeof val === 'string')) {
			send()
		} else {
			setDisplayErrorMessage(true)
		}
	}
	
	type FormObjectKey = 'mail' | 'name' | 'subject' | 'body'
	const getErrorMessage = (formObjectKey: FormObjectKey) => {
		if (displayErrorMessage) {
			return <div className={style.error}>{errorMessage()[formObjectKey]}</div>
		}
	}

	return (
  <Container>
    <div className={style.formContainer}>
      <label>件名</label>
      <Input
        placeholder="件名を入力してください"
        onChange={(e) => setSubject(e.target.value)}
      />
      {getErrorMessage('subject')}
    </div>
    <div className={style.formContainer}>
      <label>メールアドレス</label>
      <Input
        placeholder="メールアドレスを入力してください"
        onChange={(e) => setMail(e.target.value)}
      />
      {getErrorMessage('mail')}
    </div>
    <div className={style.formContainer}>
      <label>名前</label>
      <Input
        placeholder="名前を入力してください"
        onChange={(e) => setName(e.target.value)}
      />
      {getErrorMessage('name')}
    </div>
    <div className={style.formContainer}>
      <label>お問い合わせ内容</label>
      <TextArea
        placeholder="お問い合わせ内容を入力してください"
        onChange={(e) => setBody(e.target.value)}
      />
      {getErrorMessage('body')}
    </div>
    <div className={style.buttonPosition}>
      <Button
        type="primary"
        shape="round"
        icon={<SendOutlined />}
        size="large"
        onClick={sendBackConfirmation}
      >
        Send
      </Button>
    </div>
  </Container>
	)
}

export default Contact