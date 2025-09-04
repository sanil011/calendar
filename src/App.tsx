// src/App.tsx
import { useEffect, useMemo, useRef, useState, useContext, useLayoutEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import Month from "./components/ui/month-card";
import Header from "./components/sections/header";
import { rangeMonths, monthKey } from "./util/date";
import { CalendarContext } from "./contexts/calendar-context";
import { useInView, InView } from "react-intersection-observer";

import "./App.css"
const INITIAL_BEFORE = 6;
const INITIAL_AFTER = 6;
const CHUNK = 12; // how many months to add each time we hit a sentinel


export default function App() {
  const anchor = useMemo(() => new Date(), []);
  const { setActiveMonth } = useContext(CalendarContext);
  const [months, setMonths] = useState(() =>
    rangeMonths(anchor, INITIAL_BEFORE, INITIAL_AFTER)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  // const loadingTopRef = useRef(false);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const top = topSentinelRef.current;
  //   const bottom = bottomSentinelRef.current;
  //   if (!container || !top || !bottom) return;

  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       console.log("sanil", entries)
  //       for (const entry of entries) {
  //         if (!entry.isIntersecting) continue;

  //         if (entry.target.id === 'bottom-target') {
  //           // Append more months at the bottom

  //           // if (!entry.isVisible) return;
  //           setMonths((prev) => {
  //             const last = prev[prev.length - 1];
  //             const next: Date[] = [];
  //             for (let i = 1; i <= CHUNK; i++) next.push(addMonths(last, i));
  //             return [...prev, ...next];
  //           });

  //           // setMonths((prev) => {
  //           //   const date = prev[prev.length - 1];
  //           //   const months = rangeMonths(date, CHUNK, 0);
  //           //   return [...prev, ...months];
  //           // })
  //         }

  //         if (entry.target.id === 'top-target') {

  //           console.log('sanil');
  //           setMonths((prev) => {
  //             const first = prev[0];
  //             const more: Date[] = [];

  //             for (let i = CHUNK; i >= 1; i--) more.push(subMonths(first, i));
  //             return [...more, ...prev];
  //           });

  //           // setMonths((prev) => {
  //           //   const date = prev[0];
  //           //   const months = rangeMonths(date, CHUNK, 0);
  //           //   return [...months, ...prev];
  //           // })
  //         }
  //       }
  //     },
  //     {
  //       root: container,
  //       rootMargin: "1200px 0px", // start loading ahead of time
  //       threshold: 0.01,
  //     }
  //   );

  //   io.observe(top);
  //   io.observe(bottom);

  //   return () => io.disconnect();
  // }, []);
  const loadingTopRef = useRef(false);

  // Top & bottom sentinels
  const { ref: topRef, inView: topInView } = useInView({
    root: containerRef.current,
    rootMargin: " 2000px 0px",
    threshold: 0,
  });
  const { ref: bottomRef, inView: bottomInView } = useInView({
    root: containerRef.current,
    rootMargin: "1200px 0px",
    threshold: 0.01,
  });

  // Load more at bottom
  useEffect(() => {
    if (!bottomInView) return;
    setMonths((prev) => {
      const last = prev[prev.length - 1];
      const next: Date[] = [];
      for (let i = 1; i <= CHUNK; i++) next.push(addMonths(last, i));
      return [...prev, ...next];
    });
  }, [bottomInView]);
  // Load more at top (preserve scroll position)


  // useEffect(() => {
  //   if (!topInView) return;
  //   // prepend months

  //   // 1. Store reference to current first element and scroll position
  //   const container = containerRef.current;
  //   const firstElement = container?.querySelector('[data-monthkey]');
  //   const initialScrollTop = container?.scrollTop || 0;

  //   setMonths(prev => {
  //     const first = prev[0];
  //     const more: Date[] = [];
  //     for (let i = CHUNK; i >= 1; i--) more.push(subMonths(first, i));
  //     return [...more, ...prev];
  //   });


  //   // 3. After DOM update, adjust scroll position
  //   setTimeout(() => {
  //     if (!container || !firstElement) return;

  //     // Find the same element after re-render
  //     const monthKey = (firstElement as HTMLElement).dataset.monthkey;
  //     const newFirstElement = container.querySelector(`[data-monthkey="${monthKey}"]`);

  //     if (newFirstElement) {
  //       // Calculate how much the element moved down
  //       const newPosition = (newFirstElement as HTMLElement).offsetTop;
  //       const positionChange = newPosition - initialScrollTop;

  //       // Adjust scroll position to maintain visual continuity
  //       container.scrollTop = initialScrollTop + positionChange;
  //     }
  //   }, 0);

    
  // }, [topInView]);

  useEffect(() => {
    if (!topInView) return;

    const container = containerRef.current;
    const initialScrollHeight = container?.scrollHeight || 0;

    setMonths(prev => {
      const first = prev[0];
      const more: Date[] = [];
      for (let i = CHUNK; i >= 1; i--) more.push(subMonths(first, i));
      return [...more, ...prev];
    });

    // After new months are rendered, adjust scroll position
    setTimeout(() => {
      if (!container) return;
      const newScrollHeight = container.scrollHeight;
      const heightAdded = newScrollHeight - initialScrollHeight;
      container.scrollTop += heightAdded;
    }, 0);

  }, [topInView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // console.log("sanil", entry)
          // if (!entry.isVisible) return;
          const monthKey = (entry.target as HTMLElement).dataset.monthkey
          if (monthKey) {
            setActiveMonth(format(monthKey, 'MMM-yyyy'))
            // console.log("sanil", format(monthKey, 'MMM-yyyy'), entry)
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
      elem.scrollIntoView({ block: "start", behavior: "auto" })
    }
  }, []);

  return (
    <div className="h-screen relative w-full md:w-5/12 mx-auto">

      <Header />

      <div
        ref={containerRef}
        className="h-[calc(100%-80px)]"
        style={{
          overflowY: "auto",
          borderLeft: "1px solid #eee",
          borderRight: "1px solid #eee",
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >

        <div id='top-target' ref={topRef} className="border border-red-700 h-4" />

        {months.map((m,) => {
          return (
            <div key={monthKey(m)} data-monthkey={monthKey(m)}>
              <Month monthDate={m} />
            </div>
          )
        })}

        <div id='bottom-target' ref={bottomRef} className="border border-red-700 h-4" />
      </div>
    </div>

  );
}
