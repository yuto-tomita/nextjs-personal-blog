import { FC, useMemo, useState } from "react";
import style from "./Calendar.module.css";
import type { ContributionsCalendarQuery } from "queries/__generated__/ContributionsCalendarQuery.graphql";
import cn from "classnames";
import { Switch } from "antd";

interface ContributionsCalendarProps {
  contributionsCalendarData: ContributionsCalendarQuery["response"];
}

const ContributionsCalendar: FC<ContributionsCalendarProps> = ({
  contributionsCalendarData,
}) => {
  const [isHalloweenStatus, setIsHalloweenStatus] = useState(false);
  const average = useMemo(() => {
    if (contributionsCalendarData.user) {
      const total =
        contributionsCalendarData.user.contributionsCollection
          .contributionCalendar.totalContributions;

      return total / 365;
    } else {
      return 0;
    }
  }, [contributionsCalendarData]);

  const weekContributions = () => {
    if (contributionsCalendarData.user) {
      return contributionsCalendarData.user?.contributionsCollection
        .contributionCalendar.weeks;
    } else {
      return [];
    }
  };

  const getContributeColorClass = (contributionCount: number) => {
    const colors =
      contributionsCalendarData.user?.contributionsCollection
        .contributionCalendar.colors;

    if (contributionCount === 0) {
      return "#e8eaea";
    } else if (contributionCount < average + 4 && colors) {
      return isHalloweenStatus ? "#FFEE4A" : colors[0];
    } else if (contributionCount < average + 8 && colors) {
      return isHalloweenStatus ? "#FFC501" : colors[1];
    } else if (contributionCount < average + 12 && colors) {
      return isHalloweenStatus ? "#FE9600" : colors[2];
    } else if (colors) {
      return isHalloweenStatus ? "#03001C" : colors[3];
    }
  };

  const switchStatusHalloweenColor = () => {
    setIsHalloweenStatus(!isHalloweenStatus);
  };
  return (
    <>
      <div className={style.calendarContainer}>
        {weekContributions().map((val, key) => {
          return (
            <div className={style.week} key={key}>
              {val.contributionDays.map((val2, index2) => {
                return (
                  <div
                    key={index2}
                    className={cn(style.day, style.tooltipContainer)}
                    style={{
                      background: getContributeColorClass(
                        val2.contributionCount,
                      ),
                    }}
                  >
                    <div className={cn(style.tooltipContents)}>
                      {val2.date}
                      <br />
                      {val2.contributionCount}回
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <span className={style.mondayLabel}>月</span>
        <span className={style.wednesdayLabel}>水</span>
        <span className={style.fridayLabel}>金</span>
      </div>
      <label className={style.switchFormLabel}>
        草の色をハロウィン仕様にする
      </label>
      <Switch size="small" onChange={() => switchStatusHalloweenColor()} />
    </>
  );
};

export default ContributionsCalendar;
