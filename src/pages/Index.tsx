import { useState } from 'react';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader';
import { CalendarSidebar } from '@/components/Calendar/CalendarSidebar';
import { MonthView } from '@/components/Calendar/MonthView';

interface CalendarItem {
  id: string;
  name: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  visible: boolean;
  isOwned: boolean;
}

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  calendarId: string;
}

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [calendars, setCalendars] = useState<CalendarItem[]>([
    {
      id: '1',
      name: 'Personal',
      color: 'blue',
      visible: true,
      isOwned: true,
    },
    {
      id: '2',
      name: 'Trabajo',
      color: 'green',
      visible: true,
      isOwned: true,
    },
    {
      id: '3',
      name: 'Equipo Marketing',
      color: 'orange',
      visible: true,
      isOwned: false,
    },
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Reunión de equipo',
      start: new Date(),
      end: new Date(),
      color: 'blue',
      calendarId: '1',
    },
    {
      id: '2',
      title: 'Revisión de proyecto',
      start: new Date(Date.now() + 86400000), // Tomorrow
      end: new Date(Date.now() + 86400000),
      color: 'green',
      calendarId: '2',
    },
    {
      id: '3',
      title: 'Presentación cliente',
      start: new Date(Date.now() + 172800000), // Day after tomorrow
      end: new Date(Date.now() + 172800000),
      color: 'orange',
      calendarId: '3',
    },
  ]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleToggleCalendar = (id: string) => {
    setCalendars(prev => 
      prev.map(cal => 
        cal.id === id ? { ...cal, visible: !cal.visible } : cal
      )
    );
  };

  const visibleCalendars = calendars.filter(cal => cal.visible).map(cal => cal.id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        view={view}
        onViewChange={setView}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <CalendarSidebar
          calendars={calendars}
          onToggleCalendar={handleToggleCalendar}
        />
        
        <main className="flex-1 overflow-auto">
          {view === 'month' && (
            <MonthView
              currentDate={currentDate}
              events={events}
              visibleCalendars={visibleCalendars}
            />
          )}
          {view !== 'month' && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Vista de {view} próximamente disponible
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
