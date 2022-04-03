import { FC } from 'react'
import style from './Calendar.module.css'
import type { ContributionsCalendarQuery } from 'queries/__generated__/ContributionsCalendarQuery.graphql'
interface ContributionsCalendarProps {
  contributionsCalendarData: ContributionsCalendarQuery['response']
}

const ContributionsCalendar: FC<ContributionsCalendarProps> = ({
  contributionsCalendarData
}) => {
  const weekContributions = () => {
    if (contributionsCalendarData.user) {
      return contributionsCalendarData.user?.contributionsCollection
        .contributionCalendar.weeks
    } else {
      return []
    }
  }

  return (
    <div className={style.calendarContainer}>
      {weekContributions().map((val, key) => {
        return (
          <div className={style.week} key={key}>
            {val.contributionDays.map((val2, index2) => {
              return (
                <div key={index2} className={style.day}>
                  {val2.contributionCount}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ContributionsCalendar
