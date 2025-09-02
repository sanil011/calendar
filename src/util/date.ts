// src/dateUtils.ts
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  startOfWeek,
  addDays,
} from "date-fns";

export function monthKey(d: Date) {
  return format(d, "yyyy-MM");
}

/**
 * Build a fixed 6 week(42-days) calendar grid for month
 *
 * The grid:
 * - Start on the first weekday given by 'weekStartsOn' (0= Sun, 1=Mon,...6=Sat).
 * - Includes leading days from previous month and trainling days from the next month
 * so that grid always exactly 42 days (6 rows * 7 column)
 *
 * @param monthDate Date of Target month (Sun Mar 02 2025 11:23:17 GMT+0530 (India Standard Time))
 * @param weekStartsOn Which day of week start default 0 = Sunday
 * @returns Array of 42 Date objects in ascending order
 */

export function getMonthDays(
  monthDate: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
) {
  // First day of target month (Sat Mar 01 2025 00:00:00 GMT+0530 (India Standard Time))
  const start = startOfMonth(monthDate);

  // Last day - (Mon Mar 31 2025 23:59:59 GMT+0530 (India Standard Time))
  const end = endOfMonth(monthDate);

  // Start of week - Sun Feb 23 2025 00:00:00 GMT+0530 (India Standard Time)
  const gridStart = startOfWeek(start, { weekStartsOn });


  const days = eachDayOfInterval({
    start: gridStart,
    end: addDays(end, 6),
  }).slice(0, 42); // 6 weeks x 7 days

  return days;
}

export function rangeMonths(anchor: Date, before = 6, after = 6) {
  const months: Date[] = [];
  for (let i = before; i > 0; i--) months.push(subMonths(anchor, i));
  //   console.log(months);
  months.push(anchor);
  //   console.log(months);
  for (let i = 1; i <= after; i++) months.push(addMonths(anchor, i));
  //   console.log(months);
  return months;
}
