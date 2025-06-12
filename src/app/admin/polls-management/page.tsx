
import AdminLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MoreHorizontal, Eye, Edit, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const mockPollsData = [
  { id: 'poll1', question: "Engagement location: Paris or Italy?", creator: "Alice W.", votes: 370, status: 'Active', createdAt: '2024-07-28', flagged: false, isSensitive: false },
  { id: 'poll2', question: "Which house to buy? A or B?", creator: "Bob B.", votes: 165, status: 'Ended', createdAt: '2024-07-25', flagged: true, isSensitive: false },
  { id: 'poll3', question: "What to eat for lunch?", creator: "Charlie B.", votes: 150, status: 'Active', createdAt: '2024-07-29', flagged: false, isSensitive: false },
  { id: 'poll4', question: "Should I quit my job?", creator: "Eve F.", votes: 520, status: 'Active', createdAt: '2024-07-20', flagged: false, isSensitive: false },
  { id: 'poll5', question: "Losing my virginity, condom or no condom?", creator: "Sensitive Sam", votes: 100, status: 'Active', createdAt: '2024-07-21', flagged: true, isSensitive: true },
];

export default function AdminPollsManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-headline">Polls Management</h1>
          {/* <Button>Create Poll (Admin)</Button> */}
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>All Polls</CardTitle>
            <CardDescription>Monitor, manage, and moderate all polls on the platform.</CardDescription>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search polls by question, creator, or ID..." className="pl-10 w-full sm:w-1/2 lg:w-1/3" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Votes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPollsData.map((poll) => (
                  <TableRow key={poll.id} className={(poll.flagged || poll.isSensitive) ? 'bg-red-500/10 hover:bg-red-500/20' : ''}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {poll.isSensitive && <ShieldAlert className="h-4 w-4 inline-block mr-1 text-yellow-500" titleAccess="Sensitive Content"/>}
                      {poll.question}
                    </TableCell>
                    <TableCell>{poll.creator}</TableCell>
                    <TableCell>{poll.votes}</TableCell>
                    <TableCell>
                      <Badge variant={poll.status === 'Active' ? 'default' : 'outline'}
                             className={poll.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : ''}>
                        {poll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{poll.createdAt}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/polls/${poll.id}`} target="_blank"><Eye className="mr-2 h-4 w-4" /> View Poll</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Poll (Content)</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {poll.flagged || poll.isSensitive ? (
                             <DropdownMenuItem className="text-green-600 focus:text-green-700 focus:bg-green-100">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Mark as Safe
                             </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-yellow-600 focus:text-yellow-700 focus:bg-yellow-100">
                                <ShieldAlert className="mr-2 h-4 w-4" /> Flag for Review
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Poll
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockPollsData.length === 0 && (
              <p className="text-center text-muted-foreground py-10">No polls found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

