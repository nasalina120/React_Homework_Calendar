import { Component } from "react";
import styles from "./Calendar.module.sass";
import { WEEK_DAYS, MONTHS } from "./constants";
import CalendarUtils from "./calendarUtils";

import { getMonth, getYear } from "date-fns";

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

    // // перевірка, чи співпадають 2 дати (щоб підсвітити поточну дату в календарі)
    // const isTheSameDay1 = isSameDay(currentDate, new Date(2022, 0, 8));
    // const isTheSameDay2 = isSameDay(currentDate, currentDate);

    // // перевірка, чи відноситься дата до виводимого справа місяця
    // // (щоб відображати дати поточного місяця і не відображати або притіняти дати попереднього/наступного місяців)
    // const isTheSameMonth1 = isSameMonth(date, new Date(2021, 0, 7));
    // const isTheSameMonth2 = isSameMonth(date, new Date(2023, 0, 7));

    return (
      <div className={styles.pageContainer}>
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
                {m.map((day, dayIndex) => (
                  <div key={dayIndex} className={styles.calendarDayCell}>
                    {day}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar;
