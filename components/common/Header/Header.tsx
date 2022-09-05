import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProfilePageJsonLd } from 'next-seo'
import { Text } from '@components/ui'

const Header: FC = () => {
  // TODO: Google上でブログ記事がクリックされたときに選択されているmenuが'1'になるようにする
  const [menuState, setSelectMenu] = useState('')
  const router = useRouter()
  const headerContents = ['Resume', 'Blog', 'Contact']

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
  const handleClick = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    const menuName = event.currentTarget.innerText.toLocaleLowerCase()
    console.log(menuName)
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
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/',
          },
          {
            position: 2,
            name: 'Blog',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/blog',
          },
          {
            position: 3,
            name: 'Contact',
            item: 'https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/contact',
          },
        ]}
      />
      <header className="h-12 flex w-11/12 justify-between">
        <div
          className="h-hull my-auto ml-4 font-bold text-2xl cursor-pointer"
          onClick={() => router.push('/')}
        >
          tommy portfolio
        </div>

        <div className="flex gap-4 h-full mt-auto">
          {
            headerContents.map((val, index) => {
              return (
                <p
                  onClick={(e) => handleClick(e)}
                  key={index}
                  className="text-stone-500 mt-auto hover:text-black cursor-pointer"
                >
                  { val }
                </p>
              )
            })
          }
        </div>
      </header>
    </>
  )
}

export default Header
