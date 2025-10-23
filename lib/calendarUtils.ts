import { Category, CommunicationEntry, ScheduleStatus } from '@/types';

export type CalendarView = 'day' | 'week' | 'month';

export interface CalendarEvent {
  id: string;
  title: string;
  category: Category;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  issue: boolean;
  scheduleStatus: ScheduleStatus;
  location?: string;
  representatives: string[];
}

export interface DayEvents {
  date: Date;
  events: CalendarEvent[];
}

export interface WeekEvents {
  weekStart: Date;
  weekEnd: Date;
  days: DayEvents[];
}

export interface MonthEvents {
  monthStart: Date;
  monthEnd: Date;
  weeks: WeekEvents[];
}

// Convert CommunicationEntry to CalendarEvent
export function convertToCalendarEvent(
  entry: CommunicationEntry
): CalendarEvent {
  return {
    id: entry.id,
    title: entry.title,
    category: entry.category[0] || 'other', // Use first category for display
    startDate: new Date(entry.startDate),
    endDate: new Date(entry.endDate),
    allDay: entry.allDay,
    issue: entry.issue,
    scheduleStatus: entry.scheduleStatus,
    location: entry.location
      ? `${entry.location.city}, ${entry.location.province}`
      : undefined,
    representatives: entry.representatives,
  };
}

// Get start of day
export function getStartOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

// Get end of day
export function getEndOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

// Get start of week (Sunday)
export function getStartOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  return getStartOfDay(result);
}

// Get end of week (Saturday)
export function getEndOfWeek(date: Date): Date {
  const result = getStartOfWeek(date);
  result.setDate(result.getDate() + 6);
  return getEndOfDay(result);
}

// Get start of month
export function getStartOfMonth(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), 1);
  return getStartOfDay(result);
}

// Get end of month
export function getEndOfMonth(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return getEndOfDay(result);
}

// Get all days in a week
export function getWeekDays(weekStart: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    days.push(day);
  }
  return days;
}

// Get all weeks in a month
export function getMonthWeeks(monthStart: Date): Date[] {
  const weeks: Date[] = [];
  const firstDay = getStartOfWeek(monthStart);
  const lastDay = getEndOfMonth(monthStart);
  const lastWeekStart = getStartOfWeek(lastDay);

  const currentWeek = new Date(firstDay);
  while (currentWeek <= lastWeekStart) {
    weeks.push(new Date(currentWeek));
    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  return weeks;
}

// Check if two dates are the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Check if a date is today
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

// Check if a date is in the current month
export function isCurrentMonth(date: Date, currentMonth: Date): boolean {
  return (
    date.getFullYear() === currentMonth.getFullYear() &&
    date.getMonth() === currentMonth.getMonth()
  );
}

// Group events by day
export function groupEventsByDay(
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): DayEvents[] {
  const days: DayEvents[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayEvents = events.filter(
      event =>
        isSameDay(event.startDate, currentDate) ||
        (event.allDay && isSameDay(event.startDate, currentDate))
    );

    days.push({
      date: new Date(currentDate),
      events: dayEvents.sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        return a.startDate.getTime() - b.startDate.getTime();
      }),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

// Get events for a specific day
export function getEventsForDay(
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] {
  return events.filter(event => isSameDay(event.startDate, date));
}

// Get events for a week
export function getEventsForWeek(
  events: CalendarEvent[],
  weekStart: Date
): WeekEvents {
  const weekEnd = getEndOfWeek(weekStart);
  const days = groupEventsByDay(events, weekStart, weekEnd);

  return {
    weekStart: new Date(weekStart),
    weekEnd: new Date(weekEnd),
    days,
  };
}

// Get events for a month
export function getEventsForMonth(
  events: CalendarEvent[],
  monthStart: Date
): MonthEvents {
  const monthEnd = getEndOfMonth(monthStart);
  const weekStarts = getMonthWeeks(monthStart);
  const weeks = weekStarts.map(weekStart =>
    getEventsForWeek(events, weekStart)
  );

  return {
    monthStart: new Date(monthStart),
    monthEnd: new Date(monthEnd),
    weeks,
  };
}

// Format time for display
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Format month and year
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString([], {
    month: 'long',
    year: 'numeric',
  });
}

// Get time slot height (in pixels) for day/week views
export function getTimeSlotHeight(): number {
  return 40; // 40px per hour
}

// Get time slots for day/week views
export function getTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = new Date();
    time.setHours(hour, 0, 0, 0);
    slots.push(formatTime(time));
  }
  return slots;
}

// Calculate event position and height for day/week views
export function calculateEventPosition(
  event: CalendarEvent,
  timeSlotHeight: number
) {
  const startHour =
    event.startDate.getHours() + event.startDate.getMinutes() / 60;
  const endHour = event.endDate.getHours() + event.endDate.getMinutes() / 60;
  const duration = endHour - startHour;

  return {
    top: startHour * timeSlotHeight,
    height: Math.max(duration * timeSlotHeight, 20), // Minimum 20px height
  };
}
