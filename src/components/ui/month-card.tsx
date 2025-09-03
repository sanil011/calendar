// src/Month.tsx
import { format, formatDate, isSameMonth } from "date-fns";
import { getMonthDays } from "../../util/date";
import { cn } from "../../util/helper";
import { CalendarContext } from "../../contexts/calendar-context";
import { useContext } from "react";
import { Rating } from '@smastrom/react-rating'


type Props = { monthDate: Date; weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 };

/**
 * Represents a Month card UI component.
 * @component
 * @example
 * <KanbanCard
 *   monthDate={Sat May 03 2025 00:32:10 GMT+0530 (India Standard Time)}
 * />
 */

export default function Month({ monthDate, weekStartsOn = 0 }: Props) {
    const days = getMonthDays(monthDate, weekStartsOn);
    const { journalData } = useContext(CalendarContext);

    return (
        <section className="border-t border-gray-200 h-full w-full py-[6px] px-0 md:px-[12px]">

            <div
                style={{
                    height: 'calc(100vh - 140px)',
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
                            className={cn("text-right rounded-sm py-1 px-2 box-border text-black",
                                isFirstCol && "bg-gray-200"
                            )}
                            style={{
                                color: dimmed ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 1)',
                                border: "1px solid #e5e7eb",
                            }}>
                            {format(d, "d")}

                            {!dimmed && filterdData.map((data, i) => {
                                if (i > 0) return;
                                return (
                                    <div key={data.id} className="flex items-center flex-col">
                                        <Rating style={{ width: 30 }} value={data.rating} />
                                        <div className="h-12 w-11/12">
                                            <img src={data.imgUrl} className="object-contain h-full w-full" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    );
                })}
            </div>
        </section >
    );
}
