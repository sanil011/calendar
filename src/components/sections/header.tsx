/**
 * @file components/sections/header.tsx
 * @description Header component for the Calendar section.
 */

/**
 * Header component for the Calendar section.
 * @function
 * @name Header
 * @memberof module:components/sections
 * @returns {React.ReactElement} The Header component.
 */
import { useContext } from 'react'
import { CalendarContext } from '../../contexts/calendar-context'
import { AnimatePresence } from "motion/react"


import * as motion from "motion/react-client"

const Header = (): React.ReactElement => {
  const { activeMonth } = useContext(CalendarContext)

  return (
    <header className='h-[80px] sticky top-0 left-0 z-50 w-full bg-white py-2 px-[12px] border border-t-0 border-b-0 border-gray-200'>

      <div className="flex items-center justify-between">
        <h2 className="text-xl">My Dairy</h2>
        <div className="relative h-6 overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.h2
              key={activeMonth}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: "tween", duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm tabular-nums will-change-transform"
            >
              {activeMonth}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-[6px] mt-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} style={{ fontSize: 12, opacity: 0.6, textAlign: "center" }}>{d}</div>
        ))}
      </div>

    </header>
  )
}

export default Header