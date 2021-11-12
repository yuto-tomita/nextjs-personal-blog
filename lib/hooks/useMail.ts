import { useState } from 'react'

export const useMail = () => {
	const [mail, setMail] = useState('')
	const [name, setName] = useState('')
	const [subject, setSubject] = useState('')
	const [body, setBody] = useState('')

	const send = async () => {
		console.log(createBody())
		await fetch('/api/mail', {
			method: 'POST',
			body: createBody()
		})
	}

	const createBody = () => {
		return `
件名：${subject}

名前：${name}

メールアドレス：${mail}

お問い合わせ内容
${body}
		`
	}

	return {
		setMail,
		setName,
		setSubject,
		setBody,
		send
	}
}