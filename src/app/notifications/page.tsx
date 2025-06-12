
import AppLayout from '@/components/layout/AppLayout';
import { BellRing, MessageSquare, UserPlus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NotificationItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
  avatarSrc?: string;
  avatarFallback: string;
}

function NotificationItem({ icon: Icon, title, description, time, avatarSrc, avatarFallback }: NotificationItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-muted/50 transition-colors rounded-lg cursor-pointer">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={title} data-ai-hint="anime character" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Icon className="h-5 w-5 text-primary self-center" />
    </div>
  );
}

export default function NotificationsPage() {
  const notifications = [
    { icon: BellRing, title: "Your poll 'Paris or Italy?' is ending soon!", description: "Only 2 hours left for votes.", time: "10m ago", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "P" },
    { icon: MessageSquare, title: "Alice commented on your poll", description: "'Definitely Italy for the views!'", time: "1h ago", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "A" },
    { icon: UserPlus, title: "Bob started following you", description: "You have a new follower.", time: "3h ago", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "B" },
    { icon: TrendingUp, title: "Your poll 'House A or B' is trending!", description: "It received over 100 votes in the first day.", time: "1d ago", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "P" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center font-headline">Notifications</CardTitle>
            <CardDescription className="text-center">Stay updated with your PollItAGo activity.</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notif, index) => (
                  <NotificationItem key={index} {...notif} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">No new notifications.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

