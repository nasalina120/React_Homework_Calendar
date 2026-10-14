import { Component } from "react";
import styles from "./Calendar.module.sass";
import { WEEK_DAYS, MONTHS, WEEK_DAYS_Full } from "./constants";
import CalendarUtils from "./calendarUtils";

import { getMonth, getYear, isSameMonth, isSameDay } from "date-fns";
import classNames from "classnames";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      date: new Date(),
    };
  }

  render() {
    const { date, currentDate } = this.state;

    const currentYear = getYear(date);
    const currentMonth = MONTHS[getMonth(date)];

    const monthDays = CalendarUtils(date);

    const currentDayOfMonth = currentDate.getDate();
    const currentDayOfWeekIndex = currentDate.getDay();

    return (
      <div className={styles.pageContainer}>
        <div className={styles.mainLayout}>
          <div className={styles.thisDay}>
            <span className={styles.thisDayName}>
              {WEEK_DAYS_Full[currentDayOfWeekIndex]}
            </span>
            <span className={styles.thisDayNumber}>{currentDayOfMonth}</span>
          </div>

          <div className={styles.calendarWrapper}>
            <p className={styles.calendarTitle}>
              {currentMonth} {currentYear}
            </p>

            <div className={styles.calendarWeekdaysHeader}>
              {WEEK_DAYS.map((w, index) => (
                <div key={index} className={styles.weekdayName}>
                  {w}
                </div>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {monthDays.map((m, weekIndex) => (
                <div key={weekIndex} className={styles.calendarWeekRow}>
                  {m.map((day, dayIndex) => {
                    const isCurrentMonth = isSameMonth(day, date);
                    const isTheSameDay = isSameDay(day, currentDate);

                    const cellClass = classNames(styles.calendarDayCell, {
                      [styles.today]: isTheSameDay,
                    });
                    return (
                      <div key={dayIndex} className={cellClass}>
                        {isCurrentMonth ? day.getDate() : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar;
