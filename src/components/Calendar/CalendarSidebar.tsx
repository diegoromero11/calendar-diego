import { Plus, Calendar, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface CalendarItem {
  id: string;
  name: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  visible: boolean;
  isOwned: boolean;
}

interface CalendarSidebarProps {
  calendars: CalendarItem[];
  onToggleCalendar: (id: string) => void;
}

export const CalendarSidebar = ({ calendars, onToggleCalendar }: CalendarSidebarProps) => {
  const colorClasses = {
    blue: 'bg-calendar-event-blue',
    green: 'bg-calendar-event-green',
    orange: 'bg-calendar-event-orange',
    purple: 'bg-calendar-event-purple',
    red: 'bg-calendar-event-red',
  };

  return (
    <aside className="w-80 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Button className="w-full justify-start gap-2" size="lg">
          <Plus className="h-5 w-5" />
          Crear evento
        </Button>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
            Mis calendarios
          </h3>
          <div className="space-y-2">
            {calendars.filter(cal => cal.isOwned).map((calendar) => (
              <div key={calendar.id} className="flex items-center space-x-3 group">
                <Checkbox
                  checked={calendar.visible}
                  onCheckedChange={() => onToggleCalendar(calendar.id)}
                  className="data-[state=checked]:bg-primary"
                />
                <div className={`w-3 h-3 rounded-full ${colorClasses[calendar.color]}`} />
                <span className="text-sm text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
                  {calendar.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
            Calendarios compartidos
          </h3>
          <div className="space-y-2">
            {calendars.filter(cal => !cal.isOwned).map((calendar) => (
              <div key={calendar.id} className="flex items-center space-x-3 group">
                <Checkbox
                  checked={calendar.visible}
                  onCheckedChange={() => onToggleCalendar(calendar.id)}
                  className="data-[state=checked]:bg-primary"
                />
                <div className={`w-3 h-3 rounded-full ${colorClasses[calendar.color]}`} />
                <span className="text-sm text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
                  {calendar.name}
                </span>
                <Users className="h-3 w-3 text-sidebar-foreground/60 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="font-medium text-sm">Próximos eventos</h4>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Reunión de equipo</p>
            <p className="text-xs">Hoy, 10:00 AM</p>
          </div>
        </Card>
      </div>

      <div className="p-6 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
          <Settings className="h-4 w-4" />
          Configuración
        </Button>
      </div>
    </aside>
  );
};