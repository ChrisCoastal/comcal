'use client';

import {
  CalendarEvent,
  formatTime,
  calculateEventPosition,
  getTimeSlots,
  getTimeSlotHeight,
} from '@/lib/calendarUtils';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Users } from 'lucide-react';
import { categoryColors, statusColors } from '@/lib/constants';

interface CalendarDayViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

export function CalendarDayView({ events, currentDate }: CalendarDayViewProps) {
  const timeSlots = getTimeSlots();
  const timeSlotHeight = getTimeSlotHeight();

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return a.startDate.getTime() - b.startDate.getTime();
  });

  return (
    <div className='calendar-day-view'>
      {/* Header */}
      <div className='p-4 border-b bg-gray-50'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>
              {currentDate.toLocaleDateString([], {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
            <p className='text-sm text-gray-500'>
              {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-sm text-gray-500'>Today</div>
            <div className='text-lg font-medium text-gray-900'>
              {new Date().toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
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

        {/* Events column */}
        <div className='flex-1 relative'>
          {/* Time grid lines */}
          {timeSlots.map((_, index) => (
            <div
              key={index}
              className='border-b border-gray-100'
              style={{ height: `${timeSlotHeight}px` }}
            />
          ))}

          {/* All-day events at the top */}
          {sortedEvents
            .filter(event => event.allDay)
            .map(event => (
              <div key={event.id} className='border-b p-2 bg-gray-50'>
                <div
                  className={`
                p-2 rounded text-sm cursor-pointer hover:opacity-80
                ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}
              `}
                >
                  <div className='flex items-center gap-2'>
                    {event.issue && (
                      <AlertCircle className='h-4 w-4 text-red-500 flex-shrink-0' />
                    )}
                    <div className='flex-1'>
                      <div className='font-medium'>{event.title}</div>
                      <div className='text-xs opacity-75'>All day</div>
                    </div>
                    <Badge
                      className={
                        statusColors[
                          event.scheduleStatus as keyof typeof statusColors
                        ] || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {event.scheduleStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

          {/* Timed events */}
          {sortedEvents
            .filter(event => !event.allDay)
            .map(event => {
              const position = calculateEventPosition(event, timeSlotHeight);
              return (
                <div
                  key={event.id}
                  className={`
                  absolute left-0 right-0 mx-2 p-3 rounded-lg text-sm cursor-pointer hover:opacity-80 shadow-sm
                  ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}
                `}
                  style={{
                    top: `${position.top}px`,
                    height: `${Math.max(position.height, 60)}px`,
                  }}
                >
                  <div className='flex items-start gap-2 h-full'>
                    {event.issue && (
                      <AlertCircle className='h-4 w-4 text-red-500 flex-shrink-0 mt-0.5' />
                    )}
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium mb-1'>{event.title}</div>
                      <div className='text-xs opacity-75 mb-2'>
                        {formatTime(event.startDate)} -{' '}
                        {formatTime(event.endDate)}
                      </div>

                      {/* Event details */}
                      <div className='space-y-1'>
                        <Badge
                          className={
                            statusColors[
                              event.scheduleStatus as keyof typeof statusColors
                            ] || 'bg-gray-100 text-gray-800'
                          }
                          variant='secondary'
                        >
                          {event.scheduleStatus}
                        </Badge>

                        {event.location && (
                          <div className='flex items-center gap-1 text-xs opacity-75'>
                            <MapPin className='h-3 w-3' />
                            <span className='truncate'>{event.location}</span>
                          </div>
                        )}

                        {event.representatives.length > 0 && (
                          <div className='flex items-center gap-1 text-xs opacity-75'>
                            <Users className='h-3 w-3' />
                            <span className='truncate'>
                              {event.representatives.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
