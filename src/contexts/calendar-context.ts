/**
 * @file contexts/calendar-context.ts
 * @description Calendar context for managing global state related to the kanban board.
 */

import React, { createContext } from "react";
import { INITIAL_JOURNAL_DATA } from "../util/journalEntries";

export type CalendarContextType = {
  journalData: JournalType[];
  setJournalData: (data: JournalType[]) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
  activeMonth: string;
  setActiveMonth: (month: string) => void;
};

/**
 * Initial data for the kanban board context.
 * @constant
 * @type {CalendarContextType}
 */

export const INITIAL_CALENDAR_CONTEXT_DATA: CalendarContextType = {
  journalData: INITIAL_JOURNAL_DATA,
  setJournalData: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  activeMonth: "",
  setActiveMonth: () => {},
} satisfies CalendarContextType;

/**
 * Calendar context for managing global state related to the kanban board.
 * @constant
 * @type {React.Context<CalendarContextType>}
 */

export const CalendarContext: React.Context<CalendarContextType> =
  createContext<CalendarContextType>(INITIAL_CALENDAR_CONTEXT_DATA);
