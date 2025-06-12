"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ListChecks, Shield, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/polls-management', label: 'Polls Management', icon: ListChecks },
  { href: '/admin/moderators', label: 'Moderators', icon: Users },
  { href: '/admin/content-moderation', label: 'Content Moderation', icon: Shield },
  { href: '/admin/settings', label: 'Admin Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed">
      <div className="p-4 border-b border-border">
        <Link href="/admin" className="text-2xl font-bold text-primary font-headline">
          PollItAGo Admin
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Button
              key={item.label}
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="Admin User" data-ai-hint="profile person"/>
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Moderator</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="h-5 w-5 mr-3 text-muted-foreground" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
