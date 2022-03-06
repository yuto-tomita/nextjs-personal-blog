import { FC } from 'react'
import style from './Pagination.module.css'
import cn from 'classnames'

interface PaginationProps {
  currentPage: number
  onClick: (arg: number) => void
  data: unknown[]
  className?: string
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  onClick,
  data = [],
  className = ''
}) => {
  const pageCount = Math.ceil(data.length / 10)

  return (
    <div className={style.paginationWrapper}>
      {[...Array(pageCount)].map((_, index) => {
        return (
          <div
            className={cn(
              style.pagination,
              currentPage === index + 1
                ? style.currentPagination
                : '',
              className
            )}
            key={index}
            onClick={() => onClick(index + 1)}
          >
            {index + 1}
          </div>
        )
      })}
    </div>
  )
}

export default Pagination
