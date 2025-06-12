import type React from 'react';
import TopBar from './TopBar';
import BottomNavigationBar from './BottomNavigationBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-grow overflow-y-auto pt-16 pb-16 sm:pb-20"> {/* Adjusted padding for fixed bars */}
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  );
}
