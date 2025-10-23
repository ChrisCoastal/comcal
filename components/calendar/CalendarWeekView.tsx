'use client';

import {
  WeekEvents,
  isToday,
  formatTime,
  calculateEventPosition,
  getTimeSlots,
  getTimeSlotHeight,
} from '@/lib/calendarUtils';
import { AlertCircle } from 'lucide-react';
import { categoryColors } from '@/lib/constants';

interface CalendarWeekViewProps {
  events: WeekEvents;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function CalendarWeekView({
  events,
  currentDate,
  onDateSelect,
}: CalendarWeekViewProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = getTimeSlots();
  const timeSlotHeight = getTimeSlotHeight();

  return (
    <div className='calendar-week-view'>
      {/* Header with day names */}
      <div className='grid grid-cols-8 border-b'>
        <div className='p-3 text-sm font-medium text-gray-500 bg-gray-50 border-r'>
          Time
        </div>
        {weekDays.map((day, index) => {
          const dayDate = events.days[index]?.date;
          const isTodayDate = dayDate && isToday(dayDate);
          const isSelected =
            dayDate && dayDate.toDateString() === currentDate.toDateString();

          return (
            <div
              key={day}
              className={`
                p-3 text-center text-sm font-medium border-r cursor-pointer hover:bg-gray-50
                ${isTodayDate ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
                ${isSelected ? 'bg-blue-100' : 'bg-white'}
              `}
              onClick={() => dayDate && onDateSelect(dayDate)}
            >
              <div className='font-medium'>{day}</div>
              {dayDate && (
                <div
                  className={`text-lg ${isTodayDate ? 'text-blue-600' : 'text-gray-900'}`}
                >
                  {dayDate.getDate()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Time slots and events */}
      <div className='flex'>
        {/* Time column */}
        <div className='w-20 flex-shrink-0 border-r'>
          {timeSlots.map((time, index) => (
            <div
              key={time}
              className='h-10 border-b text-xs text-gray-500 flex items-center justify-end pr-2'
              style={{ height: `${timeSlotHeight}px` }}
            >
              {index % 2 === 0 && time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className='flex-1 grid grid-cols-7'>
          {events.days.map((day, dayIndex) => (
            <div key={dayIndex} className='relative border-r'>
              {/* Time grid lines */}
              {timeSlots.map((_, index) => (
                <div
                  key={index}
                  className='border-b border-gray-100'
                  style={{ height: `${timeSlotHeight}px` }}
                />
              ))}

              {/* Events */}
              {day.events.map(event => {
                const position = calculateEventPosition(event, timeSlotHeight);
                return (
                  <div
                    key={event.id}
                    className={`
                      absolute left-0 right-0 mx-1 p-1 rounded text-xs cursor-pointer hover:opacity-80
                      ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}
                    `}
                    style={{
                      top: `${position.top}px`,
                      height: `${position.height}px`,
                    }}
                    title={`${event.title} - ${formatTime(event.startDate)}`}
                  >
                    <div className='flex items-center gap-1 h-full'>
                      {event.issue && (
                        <AlertCircle className='h-3 w-3 text-red-500 flex-shrink-0' />
                      )}
                      <div className='flex-1 min-w-0'>
                        <div className='truncate font-medium'>
                          {event.title}
                        </div>
                        {!event.allDay && (
                          <div className='text-xs opacity-75'>
                            {formatTime(event.startDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
