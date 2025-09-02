/**
 * @file providers/calendar-context-provider.tsx
 * @description Provider component for the Calendar context.
 */

import { CalendarContext } from "../contexts/calendar-context";
import { INITIAL_JOURNAL_DATA } from "../util/journalEntries";
import React, { useState } from "react";

/**
 * React functional component representing the Calendar context provider.
 * @component
 * @name CalendarContextProvider
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} - The JSX elements representing the provider.
 * @example
 * <CalendarContextProvider>
 *   <App />
 * </CalendarContextProvider>
 */


export default function CalendarContextProvider({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode {
    const [journalData, setJournalData] = useState<JournalType[]>(INITIAL_JOURNAL_DATA);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeMonth, setActiveMonth] = useState<string>("");

    return (
        <CalendarContext.Provider
            value={{
                journalData,
                setJournalData,
                searchQuery,
                setSearchQuery,
                activeMonth,
                setActiveMonth
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}
