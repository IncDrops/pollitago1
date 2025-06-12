import AdminLayout from '../layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Shield, Bell, DollarSign, ListFilter, Users } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold font-headline">Admin Settings</h1>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><Shield className="mr-2 h-6 w-6 text-primary" /> Platform Security</CardTitle>
            <CardDescription>Configure security settings for the PollItAGo platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-fa-admin" className="text-base">Require 2FA for Admins</Label>
              <Switch id="two-fa-admin" defaultChecked />
            </div>
            <div>
              <Label htmlFor="rate-limit" className="text-base">API Rate Limiting (requests/min)</Label>
              <Input id="rate-limit" type="number" defaultValue="100" className="mt-1 w-1/2" />
            </div>
            <Button>Save Security Settings</Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-6 w-6 text-primary" /> Notification Settings (Admin)</CardTitle>
            <CardDescription>Manage notifications for administrators and moderators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts" className="text-base">Email for Critical System Alerts</Label>
              <Switch id="critical-alerts" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="new-report-notif" className="text-base">Notification for New Content Reports</Label>
              <Switch id="new-report-notif" defaultChecked />
            </div>
            <Button>Save Notification Settings</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><DollarSign className="mr-2 h-6 w-6 text-primary" /> Monetization Settings</CardTitle>
            <CardDescription>Configure platform fees and payout thresholds.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tipping-fee" className="text-base">"Tip The Creator" Platform Fee (%)</Label>
              <Input id="tipping-fee" type="number" defaultValue="15" className="mt-1 w-1/2" />
            </div>
            <div>
              <Label htmlFor="payout-threshold" className="text-base">PollitPoints Payout Threshold ($)</Label>
              <Input id="payout-threshold" type="number" defaultValue="20" className="mt-1 w-1/2" />
            </div>
             <div>
              <Label htmlFor="affiliate-commission" className="text-base">Default Affiliate Commission (%)</Label>
              <Input id="affiliate-commission" type="number" defaultValue="5" className="mt-1 w-1/2" />
            </div>
            <Button>Save Monetization Settings</Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><ListFilter className="mr-2 h-6 w-6 text-primary" /> Content Filtering & Defaults</CardTitle>
            <CardDescription>Set default content policies and filtering levels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
              <Label htmlFor="profanity-filter" className="text-base">Profanity Filter Strength</Label>
              {/* Placeholder for select/radio group */}
              <p className="text-sm text-muted-foreground mt-1">Options: Off, Low, Medium, High</p>
              <Input id="profanity-filter-value" defaultValue="Medium" className="mt-1 w-1/2" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-flag-sensitive" className="text-base">Auto-flag potentially sensitive content</Label>
              <Switch id="auto-flag-sensitive" defaultChecked />
            </div>
            <Button>Save Content Settings</Button>
          </CardContent>
        </Card>
         <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-6 w-6 text-primary" /> User Management Defaults</CardTitle>
            <CardDescription>Default settings for new user accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="default-private-profile" className="text-base">New user profiles private by default</Label>
              <Switch id="default-private-profile" />
            </div>
            <Button>Save User Settings</Button>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
