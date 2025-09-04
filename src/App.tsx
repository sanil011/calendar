// src/App.tsx
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { format, addMonths, subMonths } from "date-fns";
import Month from "@/components/card/month-card";
import Header from "@/components/sections/header";
import { rangeMonths, monthKey } from "@/util/date";
import { CalendarContext } from "@/contexts/calendar-context";
import AddJournal from "@/components/sections/add-journal";
import { useInView } from "react-intersection-observer";

import "./App.css"
const INITIAL_BEFORE = 6;
const INITIAL_AFTER = 6;
const CHUNK = 6; 


export default function App() {
  const anchor = useMemo(() => new Date(), []);
  const { setActiveMonth } = useContext(CalendarContext);
  const [months, setMonths] = useState(() =>
    rangeMonths(anchor, INITIAL_BEFORE, INITIAL_AFTER)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Top & bottom sentinels
  const { ref: topRef, inView: topInView } = useInView({
    root: containerRef.current,
    rootMargin: "2000px 0px",
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
          const monthKey = (entry.target as HTMLElement).dataset.monthkey
          if (monthKey) {
            setActiveMonth(format(monthKey, 'MMM-yyyy'))
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

    if (!container) return;
    const onKey = (e: KeyboardEvent) => {
      // Ignore when user is typing in a field or contentEditable
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        const typing =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          t.isContentEditable;
        if (typing) return;
      }

      const step = 80;

      let handled = true;

      switch (e.key) {
        case "ArrowDown":
          container.scrollBy({ top: step, behavior: "smooth" });
          break;
        case "ArrowUp":
          container.scrollBy({ top: -step, behavior: "smooth" });
          break;
        default:
          handled = false;
      }

      if (handled) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="h-screen max-w-[680px] relative w-full   mx-auto">

      <Header />

      <div
        ref={containerRef}
        className="h-[calc(100%-80px)] px-2"
        style={{
          overflowY: "auto",
          borderLeft: "1px solid #eee",
          borderRight: "1px solid #eee",
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >

        <div id='top-target' ref={topRef} className="h-1" />

        {months.map((m,) => {
          return (
            <div key={monthKey(m)} data-monthkey={monthKey(m)}>
              <Month monthDate={m} />
            </div>
          )
        })}

        <div id='bottom-target' ref={bottomRef} className="h-1" />
      </div>

      <AddJournal />
    </div>

  );
}
