import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'antd'

const Header: FC = () => {
	// TODO: Google上でブログ記事がクリックされたときに選択されているmenuが'1'になるようにする
	const [menuState, setSelectMenu] = useState('')
	const router = useRouter()

	const handleClick = (event: any) => {
		const menuName = event.key.toLowerCase()
		setSelectMenu(menuName)
	}

	const navigateToLink = (menuName: string) => {
		router.push(menuName)
	}

	return (
		<header>
			<Menu mode="horizontal" selectedKeys={[menuState]} onClick={handleClick}>
				{['Home', 'Blog', 'Contact'].map((menuName, index) => (
					<Menu.Item key={menuName.toLowerCase()} onClick={() => navigateToLink(menuName)}>{menuName}</Menu.Item>
				))}
			</Menu>
		</header>
	)
}

export default Header