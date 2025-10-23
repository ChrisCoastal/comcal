'use client';

import { MonthEvents, isToday, isCurrentMonth } from '@/lib/calendarUtils';
import { AlertCircle } from 'lucide-react';
import { categoryColors } from '@/lib/constants';

interface CalendarMonthViewProps {
  events: MonthEvents;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function CalendarMonthView({
  events,
  currentDate,
  onDateSelect,
}: CalendarMonthViewProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className='calendar-month-view'>
      {/* Week day headers */}
      <div className='grid grid-cols-7 border-b'>
        {weekDays.map(day => (
          <div
            key={day}
            className='p-3 text-center text-sm font-medium text-gray-500 bg-gray-50'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className='grid grid-cols-7'>
        {events.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => {
            const isCurrentMonthDay = isCurrentMonth(day.date, currentDate);
            const isTodayDate = isToday(day.date);
            const isSelected =
              day.date.toDateString() === currentDate.toDateString();

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`
                  min-h-[120px] border-r border-b p-2 cursor-pointer hover:bg-gray-50
                  ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                  ${isTodayDate ? 'bg-blue-50 border-blue-200' : ''}
                  ${isSelected ? 'bg-blue-100 border-blue-300' : ''}
                `}
                onClick={() => onDateSelect(day.date)}
              >
                {/* Date number */}
                <div
                  className={`
                  text-sm font-medium mb-1
                  ${isTodayDate ? 'text-blue-600' : ''}
                  ${!isCurrentMonthDay ? 'text-gray-400' : 'text-gray-900'}
                `}
                >
                  {day.date.getDate()}
                </div>

                {/* Events */}
                <div className='space-y-1'>
                  {day.events.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`
                        text-xs p-1 rounded truncate cursor-pointer hover:opacity-80
                        ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}
                      `}
                      title={`${event.title} - ${event.startDate.toLocaleTimeString(
                        [],
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}`}
                    >
                      <div className='flex items-center gap-1'>
                        {event.issue && (
                          <AlertCircle className='h-3 w-3 text-red-500 flex-shrink-0' />
                        )}
                        <span className='truncate'>{event.title}</span>
                      </div>
                      {!event.allDay && (
                        <div className='text-xs opacity-75'>
                          {event.startDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Show more indicator */}
                  {day.events.length > 3 && (
                    <div className='text-xs text-gray-500'>
                      +{day.events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
