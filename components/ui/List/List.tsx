import { FC, CSSProperties } from 'react'
import style from './List.module.css'
import Link from 'next/link'

interface ArticleInfo {
  title: string
  description: string
  href: string
  created_at: string
}
interface ListProps {
  articleInfo: ArticleInfo[]
}

const List: FC<ListProps> = ({ articleInfo = [] }) => {
  return (
    <div className={style.listWrapper}>
      <ul>
        {articleInfo.map((val, key) => {
          return (
            <Link href={`/blog/${val.href}`} key={key}>
              <li className={style.list}>
                <div className={style.listPostDate}>
                  {val.created_at}
                </div>
                <div className={style.listTitle}>{val.title}</div>
                <div className={style.listDescription}>
                  {val.description}
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default List
