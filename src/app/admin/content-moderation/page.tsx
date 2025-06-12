import AdminLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, XCircle, Eye, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const mockReportedContent = [
  { id: 'report1', type: 'Poll Question', contentPreview: "Is it okay to punch your boss if...", reportedBy: "UserA", reason: "Incites violence", date: "2024-07-29", status: "Pending", pollId: "poll56" },
  { id: 'report2', type: 'Comment', contentPreview: "Everyone who picked Option B is an idiot!", reportedBy: "UserB", reason: "Hate speech/Insult", date: "2024-07-28", status: "Action Taken", pollId: "poll12" },
  { id: 'report3', type: 'User Profile', contentPreview: "UserX's bio contains offensive language.", reportedBy: "UserC", reason: "Inappropriate Profile", date: "2024-07-27", status: "Pending", userId: "userXyz" },
  { id: 'report4', type: 'Poll Image', contentPreview: "Image in poll 'Outfit Check' is NSFW.", reportedBy: "UserD", reason: "Explicit Content", date: "2024-07-29", status: "Pending", pollId: "poll89" },
];

export default function AdminContentModerationPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold font-headline">Content Moderation Queue</h1>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Reported Content</CardTitle>
            <CardDescription>Review and take action on content reported by users or flagged by the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[30%]">Content Preview</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReportedContent.map((item) => (
                  <TableRow key={item.id} className={item.status === 'Pending' ? 'bg-yellow-500/10' : ''}>
                    <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                    <TableCell className="truncate max-w-sm">{item.contentPreview}</TableCell>
                    <TableCell>{item.reportedBy}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Pending' ? 'destructive' : 'default'}
                        className={item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {item.pollId && <Button variant="ghost" size="icon" asChild><Link href={`/polls/${item.pollId}`} target="_blank" title="View Content"><Eye className="h-4 w-4" /></Link></Button>}
                      {item.userId && <Button variant="ghost" size="icon" asChild><Link href={`/profile/${item.userId}`} target="_blank" title="View User"><UserX className="h-4 w-4" /></Link></Button>}
                      {item.status === 'Pending' && (
                        <>
                          <Button variant="ghost" size="icon" title="Approve Content"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" title="Reject/Remove Content"><XCircle className="h-4 w-4 text-red-600" /></Button>
                          <Button variant="ghost" size="icon" title="Warn User"><AlertTriangle className="h-4 w-4 text-yellow-600" /></Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockReportedContent.length === 0 && (
              <p className="text-center text-muted-foreground py-10">Moderation queue is empty. Great job!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
