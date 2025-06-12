import Link from 'next/link';
import { MessageCircle, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-card border-b border-border shadow-sm">
      <Link href="/" className="text-xl font-bold text-primary font-headline">
        PollItAGo
      </Link>
      <nav className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/messages" aria-label="Messages">
            <MessageCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile" aria-label="Profile">
            <User className="h-5 w-5" />
          </Link>
        </Button>
         {/* Admin link - conditionally render based on auth in a real app */}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin" aria-label="Admin Panel">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </nav>
    </header>
  );
}
