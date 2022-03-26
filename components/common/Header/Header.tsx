import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'antd'
import { ProfilePageJsonLd } from 'next-seo'

const Header: FC = () => {
  // TODO: Google上でブログ記事がクリックされたときに選択されているmenuが'1'になるようにする
  const [menuState, setSelectMenu] = useState('')
  const router = useRouter()
  const headerContents = ['home', 'blog', 'contact']

  /** 表示されているパスを取得して、Menuを選択されている状態にする */
  useEffect(() => {
    const currentMenuName = findCurrentPathFromMenu(router.pathname)

    if (currentMenuName === '' || !currentMenuName) {
      setSelectMenu('home')
    } else {
      setSelectMenu(currentMenuName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 現在表示されているパスから選択されているmenu名を返す */
  const findCurrentPathFromMenu = (path: string) => {
    return headerContents.find((val) => path.includes(val))
  }

  /** 選択されているMenuを小文字に変換して、選択されているMenuを更新する */
  const handleClick = (event: any) => {
    const menuName = event.key.toLowerCase()
    setSelectMenu(menuName)
    navigateToMenu(menuName)
  }

  /** Menuをクリックしたら該当のパスにルーティングするする */
  const navigateToMenu = (routingPathName: string) => {
    if (routingPathName === 'home') {
      router.push('/')
    } else {
      router.push(`/${routingPathName}`)
    }
  }

  return (
    <>
      <ProfilePageJsonLd
        breadcrumb={[
          {
            position: 1,
            name: 'Home',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/'
          },
          {
            position: 2,
            name: 'Blog',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/blog'
          },
          {
            position: 3,
            name: 'Contact',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/contact'
          }
        ]}
      />
      <header>
        <Menu
          mode="horizontal"
          selectedKeys={[menuState]}
          onClick={handleClick}
        >
          {headerContents.map((menuName) => (
            <Menu.Item key={menuName.toLowerCase()}>
              {menuName}
            </Menu.Item>
          ))}
        </Menu>
      </header>
    </>
  )
}

export default Header
