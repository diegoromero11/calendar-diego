import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  view: 'month' | 'week' | 'day' | 'agenda';
  onViewChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
}

export const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  view,
  onViewChange
}: CalendarHeaderProps) => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <header className="flex items-center justify-between p-6 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="ml-2"
          >
            Hoy
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-secondary rounded-lg p-1">
          {(['month', 'week', 'day', 'agenda'] as const).map((viewType) => (
            <Button
              key={viewType}
              variant={view === viewType ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(viewType)}
              className="capitalize"
            >
              {viewType === 'month' ? 'Mes' : 
               viewType === 'week' ? 'Semana' : 
               viewType === 'day' ? 'Día' : 'Agenda'}
            </Button>
          ))}
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Crear
        </Button>
      </div>
    </header>
  );
};