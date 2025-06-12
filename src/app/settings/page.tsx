import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Palette, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center font-headline">Settings</CardTitle>
            <CardDescription className="text-center">Manage your account and app preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Account Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><User className="mr-2 h-5 w-5 text-primary" /> Account</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">Edit Profile</Button>
                <Button variant="outline" className="w-full justify-start">Change Password</Button>
                <Button variant="outline" className="w-full justify-start">Manage Payment Methods (Stripe)</Button>
              </div>
            </div>
            <Separator />
            {/* Notification Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" /> Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                  <Switch id="email-notifications" />
                </div>
              </div>
            </div>
            <Separator />
            {/* Appearance Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" /> Appearance</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Theme selection (Light, Dark, System) will be available here.</p>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-base">Dark Mode (Currently Default)</Label>
                  <Switch id="dark-mode" checked disabled />
                </div>
              </div>
            </div>
            <Separator />
            {/* Privacy Settings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Shield className="mr-2 h-5 w-5 text-primary" /> Privacy</h3>
               <Button variant="outline" className="w-full justify-start">Privacy Policy</Button>
               <Button variant="outline" className="w-full justify-start mt-2">Terms of Service</Button>
            </div>
             <Separator />
            {/* Logout */}
            <Button variant="destructive" className="w-full font-semibold">
              <LogOut className="mr-2 h-5 w-5" /> Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
