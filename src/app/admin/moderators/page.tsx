
import AdminLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockModerators = [
  { id: 'mod1', name: 'Jane Admin', email: 'jane@pollitago.com', role: 'Super Moderator', status: 'Active', lastLogin: '2024-07-28 10:00 AM', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 'mod2', name: 'John Steward', email: 'john@pollitago.com', role: 'Moderator', status: 'Active', lastLogin: '2024-07-28 09:30 AM', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 'mod3', name: 'Alice Keeper', email: 'alice@pollitago.com', role: 'Content Reviewer', status: 'Inactive', lastLogin: '2024-07-25 15:00 PM', avatarUrl: 'https://placehold.co/40x40.png' },
];

export default function AdminModeratorsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-headline">Manage Moderators</h1>
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Add Moderator
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Moderator List</CardTitle>
            <CardDescription>View, add, or manage moderators for PollItAGo.</CardDescription>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search moderators by name or email..." className="pl-10 w-full sm:w-1/2 lg:w-1/3" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Moderator</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockModerators.map((mod) => (
                  <TableRow key={mod.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                           <AvatarImage src={mod.avatarUrl} alt={mod.name} data-ai-hint="anime character"/>
                           <AvatarFallback>{mod.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mod.name}</p>
                          <p className="text-xs text-muted-foreground">{mod.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{mod.role}</TableCell>
                    <TableCell>
                      <Badge variant={mod.status === 'Active' ? 'default' : 'secondary'} 
                             className={mod.status === 'Active' ? 'bg-green-500/80 hover:bg-green-500/70 text-white' : 'bg-yellow-500/80 hover:bg-yellow-500/70 text-white'}>
                        {mod.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{mod.lastLogin}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Moderator</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>{mod.status === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Remove Moderator</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockModerators.length === 0 && (
              <p className="text-center text-muted-foreground py-10">No moderators found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

