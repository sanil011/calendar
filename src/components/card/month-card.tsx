// src/Month.tsx
import { useContext } from "react";
import { format, formatDate, isSameMonth } from "date-fns";
import { getMonthDays } from "@/util/date";
import { cn } from "@/lib/utils";
import { CalendarContext } from "@/contexts/calendar-context";
import JournalCardMonth from "@/components/card/journal-card-month";



type Props = { monthDate: Date; weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 };

/**
 * Represents a Month card UI component.
 * @component
 * @example
 * <MonthCard
 *   monthDate={Sat May 03 2025 00:32:10 GMT+0530 (India Standard Time)}
 * />
 */

export default function Month({ monthDate, weekStartsOn = 0 }: Props) {
    const days = getMonthDays(monthDate, weekStartsOn);
    const { journalData } = useContext(CalendarContext);

    return (
        <section className="border-t border-gray-200 h-full w-full py-[6px] px-0 md:px-[12px]">

            <div
                className="h-[calc(100vh-140px)]"
                style={{
                    width: '100%',
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 6,
                    gridTemplateRows: 'repeat(6, 1fr)',

                }}>

                {days.map((d, i) => {
                    const dimmed = !isSameMonth(d, monthDate);
                    const isFirstCol = i % 7 === 0;
                    const key = formatDate(d, 'dd/MM/yyyy');
                    const filterdData = journalData.filter((data) => {
                        if (key == data.date) {
                            return true;
                        } return false
                    })


                    return (
                        <div key={String(key)}
                            className={cn("text-right rounded-sm py-1 px-2 box-border text-black cursor-pointer",
                                isFirstCol && "bg-gray-200"
                            )}
                            onClick={() => {

                                if (!dimmed && filterdData.length == 0) {
                                    const elem = document.getElementById('add-journal-btn');
                                    elem?.click()
                                }
                            }}
                            style={{
                                color: dimmed ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 1)',
                                border: "1px solid #e5e7eb",
                            }}>
                            {format(d, "d")}

                            {!dimmed && filterdData.map((data, i) => {
                                if (i > 0) return;
                                return (
                                    <JournalCardMonth
                                        key={data.id}
                                        id={data.id}
                                        imgUrl={data.imgUrl}
                                        rating={data.rating}
                                    />
                                )
                            })}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
