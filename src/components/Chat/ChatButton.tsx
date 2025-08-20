import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ChatButton = () => {
  const { toast } = useToast();

  const handleChatClick = () => {
    toast({
      title: "Chat próximamente",
      description: "El módulo de chat estará disponible pronto",
    });
  };

  return (
    <Button
      onClick={handleChatClick}
      size="icon"
      className="fixed bottom-4 left-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
      aria-label="Abrir chat"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};