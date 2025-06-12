import type React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-grow ml-64 p-8 overflow-y-auto"> {/* Adjust ml to match sidebar width */}
        {children}
      </main>
    </div>
  );
}
