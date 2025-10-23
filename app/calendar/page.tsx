'use client';

import { useState, useMemo } from 'react';
import { mockEntries } from '@/data/mockData';
import {
  convertToCalendarEvent,
  CalendarView,
  getEventsForDay,
  getEventsForWeek,
  getEventsForMonth,
} from '@/lib/calendarUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  CalendarMonthView,
  CalendarWeekView,
  CalendarDayView,
} from '@/components/calendar';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [searchQuery, setSearchQuery] = useState('');

  // Convert entries to calendar events
  const calendarEvents = useMemo(() => {
    return mockEntries.map(convertToCalendarEvent);
  }, []);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return calendarEvents;

    const query = searchQuery.toLowerCase();
    return calendarEvents.filter(
      event =>
        event.title.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.representatives.some(rep => rep.toLowerCase().includes(query))
    );
  }, [calendarEvents, searchQuery]);

  // Get events for current view
  const dayEvents = useMemo(() => {
    return getEventsForDay(filteredEvents, currentDate);
  }, [filteredEvents, currentDate]);

  const weekEvents = useMemo(() => {
    return getEventsForWeek(filteredEvents, currentDate);
  }, [filteredEvents, currentDate]);

  const monthEvents = useMemo(() => {
    return getEventsForMonth(filteredEvents, currentDate);
  }, [filteredEvents, currentDate]);

  const navigateToPrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateToNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getViewTitle = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };

    if (view === 'day') {
      options.weekday = 'long';
      options.day = 'numeric';
    }

    return currentDate.toLocaleDateString([], options);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <h1 className='text-2xl font-bold text-gray-900'>Calendar</h1>
              <div className='hidden sm:flex items-center space-x-2 text-sm text-gray-500'>
                <Calendar className='h-4 w-4' />
                <span>Event & Communications Management</span>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <Button size='sm' asChild>
                <a href='/newentry'>
                  <Plus className='h-4 w-4 mr-2' />
                  New Entry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            {/* Navigation */}
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={navigateToPrevious}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm' onClick={navigateToNext}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm' onClick={goToToday}>
                  Today
                </Button>
              </div>
              <h2 className='text-xl font-semibold text-gray-900'>
                {getViewTitle()}
              </h2>
            </div>

            {/* View Toggle and Search */}
            <div className='flex items-center space-x-4'>
              {/* Search */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search events...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-10 w-64'
                />
              </div>

              {/* View Toggle */}
              <div className='flex items-center bg-gray-100 rounded-lg p-1'>
                <Button
                  variant={view === 'day' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setView('day')}
                  className='px-3'
                >
                  Day
                </Button>
                <Button
                  variant={view === 'week' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setView('week')}
                  className='px-3'
                >
                  Week
                </Button>
                <Button
                  variant={view === 'month' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setView('month')}
                  className='px-3'
                >
                  Month
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <Card>
          <CardContent className='p-0'>
            {view === 'month' && (
              <CalendarMonthView
                events={monthEvents}
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
              />
            )}
            {view === 'week' && (
              <CalendarWeekView
                events={weekEvents}
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
              />
            )}
            {view === 'day' && (
              <CalendarDayView events={dayEvents} currentDate={currentDate} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
