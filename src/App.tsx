// src/App.tsx
import { useEffect, useMemo, useRef, useState, useContext, useLayoutEffect } from "react";
import { subMonths, format } from "date-fns";
import Month from "./components/ui/month-card";
import Header from "./components/sections/header";
import { rangeMonths, monthKey } from "./util/date";
import { CalendarContext } from "./contexts/calendar-context";
import { useInView } from "react-intersection-observer";

const INITIAL_BEFORE = 6;
const INITIAL_AFTER = 6;
const CHUNK = 4; // how many months to add each time we hit a sentinel


export default function App() {
  const anchor = useMemo(() => new Date(), []);
  const { setActiveMonth, journalData } = useContext(CalendarContext);
  const [months, setMonths] = useState(() =>
    rangeMonths(anchor, INITIAL_BEFORE, INITIAL_AFTER)
  );

  const { ref, inView, entry } = useInView({
    threshold: 0
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const top = topSentinelRef.current;
    const bottom = bottomSentinelRef.current;
    if (!container || !top || !bottom) return;

    const io = new IntersectionObserver(
      (entries) => {
        console.log("sanil", entries)
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          if (entry.target.id === 'bottom-target') {
            // Append more months at the bottom

            // if (!entry.isVisible) return;
            // setMonths((prev) => {
            //   const last = prev[prev.length - 1];
            //   const next: Date[] = [];
            //   for (let i = 1; i <= CHUNK; i++) next.push(addMonths(last, i));
            //   return [...prev, ...next];
            // });

            // setMonths((prev) => {
            //   const date = prev[prev.length - 1];
            //   const months = rangeMonths(date, CHUNK, 0);
            //   return [...prev, ...months];
            // })
          }

          if (entry.target.id === 'top-target') {

            // if (!entry.isVisible) return;
            // Prepend more months at the top and keep the view stable
            // const prevScroll = container.scrollTop;
            // const prevFirstKey = container.querySelector<HTMLElement>("[data-monthkey]");
            // console.log(prevScroll, prevFirstKey, "sanil")

            // setMonths((prev) => {
            //   const first = prev[0];
            //   const more: Date[] = [];

            //   for (let i = CHUNK; i >= 1; i--) more.push(subMonths(first, i));
            //   return [...more, ...prev];
            // });

            // setMonths((prev) => {
            //   const date = prev[0];
            //   const months = rangeMonths(date, CHUNK, 0);
            //   return [...months, ...prev];
            // })

          }
        }
      },
      {
        root: container,
        rootMargin: "400px 0px", // start loading ahead of time
        threshold: 0.1,
      }
    );

    io.observe(top);
    io.observe(bottom);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          console.log("sanil",entry)
          // if (!entry.isVisible) return;
          const monthKey = (entry.target as HTMLElement).dataset.monthkey
          if (monthKey) {
            setActiveMonth(format(monthKey, 'MMM-yyyy'))
            console.log("sanil", format(monthKey, 'MMM-yyyy'),entry)
          }
        }
      },
      {
        root: container,
        threshold: 0.9,
      }
    );

    const elem = Array.from(container.children);
    elem.forEach((item) => {
      io.observe(item)
    })
    return () => {
      elem.forEach((item) => {
        io.unobserve(item)
      })
      io.disconnect();
    };
  }, [months.length])

  useEffect(() => {
    const container = containerRef.current;
    const currentMonth = monthKey(new Date())
    const elem = container?.querySelector(`[data-monthkey="${currentMonth}"]`)
    if (elem) {
      console.log('sanil', elem)
      elem.scrollIntoView({ block: "start", behavior: "auto" })
    }
  }, []);

  return (
    <div className="h-screen relative w-full md:w-6/12 mx-auto">

      <Header />

      <div
        ref={containerRef}
        className="h-[calc(100%-80px)]"
        style={{
          overflowY: "auto",
          borderLeft: "1px solid #eee",
          borderRight: "1px solid #eee",
        }}
      >

        <div id='top-target' className="border border-red-700 h-4" ref={topSentinelRef} />

        {months.map((m,) => {
          return (
            <div key={monthKey(m)} data-monthkey={monthKey(m)}>
              <Month monthDate={m} />
            </div>
          )
        })}

        <div id='bottom-target' ref={bottomSentinelRef} className="border border-red-700 h-4" />
      </div>
    </div>

  );
}
