import AdminLayout from './layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ListChecks, AlertTriangle, BarChartHorizontalBig } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "10,254", icon: Users, color: "text-blue-500" },
    { title: "Active Polls", value: "1,580", icon: ListChecks, color: "text-green-500" },
    { title: "Reported Content", value: "32", icon: AlertTriangle, color: "text-red-500" },
    { title: "New Signups (24h)", value: "112", icon: BarChartHorizontalBig, color: "text-yellow-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Overview of recent platform events.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for recent activity feed or chart */}
              <ul className="space-y-3">
                <li className="text-sm"><span className="font-semibold">User 'john_doe'</span> created a new poll.</li>
                <li className="text-sm"><span className="font-semibold">Poll 'Favorite Color'</span> was reported for review.</li>
                <li className="text-sm"><span className="font-semibold">Moderator 'jane_admin'</span> banned a user.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Moderation Queue</CardTitle>
              <CardDescription>Items requiring moderator attention.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for moderation queue */}
              <p className="text-muted-foreground">No items currently in the moderation queue.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
