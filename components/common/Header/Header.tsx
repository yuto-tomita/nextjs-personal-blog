import React, { FC, useState } from 'react'
import { Menu } from 'antd'

const Header: FC = () => {
	const [menuState, setSelectMenu] = useState('0')

	const handleClick = (event: any) => {
		setSelectMenu(event.key)
	}

	return (
		<header>
			<Menu mode="horizontal" selectedKeys={[menuState]} onClick={handleClick}>
				{['Home', 'Blog', 'Contact'].map((menuName, index) => (
					<Menu.Item key={index}>{menuName}</Menu.Item>
				))}
			</Menu>
		</header>
	)
}

export default Header