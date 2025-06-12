
import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

const mockConversations: Conversation[] = [
  { id: 'convo1', name: 'Bob The Builder', avatarUrl: 'https://placehold.co/50x50.png', lastMessage: "Thanks for the advice on the house poll!", timestamp: "10:30 AM", unreadCount: 2 },
  { id: 'convo2', name: 'Charlie Brown', avatarUrl: 'https://placehold.co/50x50.png', lastMessage: "Sure, let's grab lunch next week.", timestamp: "Yesterday" },
  { id: 'convo3', name: 'Diana Prince', avatarUrl: 'https://placehold.co/50x50.png', lastMessage: "The Jazz Fest was amazing!", timestamp: "Mon" },
  { id: 'convo4', name: 'Support Team', avatarUrl: 'https://placehold.co/50x50.png', lastMessage: "Your pledge payout has been processed.", timestamp: "Last Week" },
];

export default function MessagesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-0 sm:px-4 py-8 h-full flex flex-col">
        <Card className="w-full md:max-w-2xl mx-auto shadow-xl flex-grow flex flex-col">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold font-headline">Messages</CardTitle>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-6 w-6 text-primary" />
              </Button>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-y-auto">
            {mockConversations.length > 0 ? (
              <div className="divide-y divide-border">
                {mockConversations.map((convo) => (
                  <Link key={convo.id} href={`/messages/${convo.id}`} passHref>
                    <div className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={convo.avatarUrl} alt={convo.name} data-ai-hint="anime character"/>
                        <AvatarFallback>{convo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold truncate">{convo.name}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{convo.timestamp}</span>
                        </div>
                        <p className={`text-sm truncate ${convo.unreadCount ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{convo.lastMessage}</p>
                      </div>
                      {convo.unreadCount && convo.unreadCount > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">No messages yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

