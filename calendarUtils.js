import {
  getWeek,
  startOfMonth,
  endOfMonth,
  getYear,
  startOfWeek,
  parse,
  addDays,
} from "date-fns";

const CalendarUtils = (date) => {
  const startWeek = getWeek(startOfMonth(date));
  const endWeek = getWeek(endOfMonth(date));

  const monthDays = [];

  for (let i = startWeek; i <= endWeek; i++) {
    const weekDays = [];
    const startWeekDay = startOfWeek(
      parse(`${i}`, "w", new Date(getYear(date), 0, 1)),
    );

    for (let j = 0; j < 7; j++) {
      weekDays.push(addDays(startWeekDay, j));
    }
    monthDays.push(weekDays);
  }
  return monthDays;
};
export default CalendarUtils;
