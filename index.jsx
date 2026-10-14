import { Component } from "react";
import styles from "./Calendar.module.sass";
import {
  getDate,
  getDay,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  getWeek,
  getYear,
  addDays,
  parse,
  isSameDay,
  isSameMonth,
} from "date-fns";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

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

    // поточне число
    const currentDay = getDate(currentDate);
    // день тижня
    const currentWeekday = WEEK_DAYS[getDay(currentDate)];

    // номер початкового тижня місяця (як тиждень першого дня місяці)
    const startWeek = getWeek(startOfMonth(date));
    // номер кінцевого тижня місяця (як тиждень останнього дня місяці)
    const endWeek = getWeek(endOfMonth(date));

    const monthDays = [];

    for (let i = startWeek; i <= endWeek; i++) {
      const weekDays = [];

      // отримати дату першого дня тижня по номеру тижня
      let startWeekDay = startOfWeek(
        parse(`${i}`, "w", new Date(getYear(date), 0, 1)),
      );

      // отримати всі 7 дат тижня по першому дню тижня
      for (let j = 0; j < 7; j++) {
        weekDays.push(getDate(addDays(startWeekDay, j)));
      }
      monthDays.push(weekDays);
    }

    // перевірка, чи співпадають 2 дати (щоб підсвітити поточну дату в календарі)
    const isTheSameDay1 = isSameDay(currentDate, new Date(2022, 0, 8));
    const isTheSameDay2 = isSameDay(currentDate, currentDate);

    // перевірка, чи відноситься дата до виводимого справа місяця
    // (щоб відображати дати поточного місяця і не відображати або притіняти дати попереднього/наступного місяців)
    const isTheSameMonth1 = isSameMonth(date, new Date(2021, 0, 7));
    const isTheSameMonth2 = isSameMonth(date, new Date(2023, 0, 7));

    return (
      <div className={styles.pageContainer}>
        <div className={styles.calendarWrapper}>
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
