import { FC, useMemo } from 'react'
import style from './Calendar.module.css'
import type { ContributionsCalendarQuery } from 'queries/__generated__/ContributionsCalendarQuery.graphql'
import cn from 'classnames'
import { Tooltip } from 'antd'

interface ContributionsCalendarProps {
  contributionsCalendarData: ContributionsCalendarQuery['response']
}

const ContributionsCalendar: FC<ContributionsCalendarProps> = ({
  contributionsCalendarData
}) => {
  const average = useMemo(() => {
    if (contributionsCalendarData.user) {
      const total =
        contributionsCalendarData.user.contributionsCollection
          .contributionCalendar.totalContributions

      return total / 365
    } else {
      return 0
    }
  }, [contributionsCalendarData])

  const weekContributions = () => {
    if (contributionsCalendarData.user) {
      return contributionsCalendarData.user?.contributionsCollection
        .contributionCalendar.weeks
    } else {
      return []
    }
  }

  const getContributeColorClass = (contributionCount: number) => {
    const colors =
      contributionsCalendarData.user?.contributionsCollection
        .contributionCalendar.colors

    if (contributionCount === 0) {
      return '#e8eaea'
    } else if (contributionCount < average + 4 && colors) {
      return colors[0]
    } else if (contributionCount < average + 8 && colors) {
      return colors[1]
    } else if (contributionCount < average + 12 && colors) {
      return colors[2]
    } else if (colors) {
      return colors[3]
    }
  }

  return (
    <div className={style.calendarContainer}>
      {weekContributions().map((val, key) => {
        return (
          <div className={style.week} key={key}>
            {val.contributionDays.map((val2, index2) => {
              return (
                <div
                  key={index2}
                  className={cn(style.day)}
                  style={{
                    background: getContributeColorClass(
                      val2.contributionCount
                    )
                  }}
                >
                  <Tooltip title={val2.date}>
                    <span className={style.countFontHide}>
                      {val2.contributionCount}
                    </span>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        )
      })}
      <span className={style.mondayLabel}>月</span>
      <span className={style.wednesdayLabel}>水</span>
      <span className={style.fridayLabel}>金</span>
    </div>
  )
}

export default ContributionsCalendar
