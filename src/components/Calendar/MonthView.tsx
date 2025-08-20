import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  calendarId: string;
}

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  visibleCalendars: string[];
}

export const MonthView = ({ currentDate, events, visibleCalendars }: MonthViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - i - 1);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => {
      if (!visibleCalendars.includes(event.calendarId)) return false;
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const days = generateCalendarDays();
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const colorClasses = {
    blue: 'bg-calendar-event-blue text-white',
    green: 'bg-calendar-event-green text-white',
    orange: 'bg-calendar-event-orange text-white',
    purple: 'bg-calendar-event-purple text-white',
    red: 'bg-calendar-event-red text-white',
  };

  return (
    <div className="flex-1 bg-background">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-border bg-card">
        {weekDays.map((day) => (
          <div key={day} className="p-4 text-center">
            <span className="text-sm font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 h-full">
        {days.map((day, index) => {
          const dayEvents = getDayEvents(day.date);
          const isSelected = selectedDate?.toDateString() === day.date.toDateString();
          
          return (
            <div
              key={index}
              className={cn(
                "min-h-32 border-r border-b border-border p-2 cursor-pointer transition-colors hover:bg-accent/50",
                !day.isCurrentMonth && "bg-muted/30 text-muted-foreground",
                isSelected && "bg-accent",
                isToday(day.date) && day.isCurrentMonth && "bg-calendar-today/10 border-calendar-today"
              )}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isToday(day.date) && day.isCurrentMonth && "bg-calendar-today text-white rounded-full w-6 h-6 flex items-center justify-center",
                    isWeekend(day.date) && day.isCurrentMonth && !isToday(day.date) && "text-calendar-weekend"
                  )}
                >
                  {day.date.getDate()}
                </span>
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs px-2 py-1 rounded text-white truncate",
                      colorClasses[event.color]
                    )}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground px-2">
                    +{dayEvents.length - 3} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};