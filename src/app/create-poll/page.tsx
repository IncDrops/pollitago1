import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, ImagePlus, Video, CalendarDays, DollarSign } from 'lucide-react';

export default function CreatePollPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center font-headline">Create New Poll</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="question" className="text-lg">Your Question</Label>
              <Textarea id="question" placeholder="e.g., Which movie should I watch tonight?" className="mt-1 min-h-[80px]" />
            </div>

            <div className="space-y-3">
              <Label className="text-lg">Options (up to 4)</Label>
              {[1, 2].map((i) => ( // Show 2 options by default, allow adding more
                <div key={i} className="space-y-2 p-3 border rounded-md">
                  <Input placeholder={`Option ${i}`} />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm"><ImagePlus className="mr-2 h-4 w-4" /> Add Image (Max 2)</Button>
                  </div>
                </div>
              ))}
               <Button variant="outline" className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Add Another Option</Button>
            </div>
            
            <div>
              <Label htmlFor="video" className="text-lg">Context Video (Optional)</Label>
               <Button variant="outline" className="w-full mt-1"><Video className="mr-2 h-4 w-4" /> Upload Video (Max 60s)</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-lg">Poll Duration</Label>
                <Input id="duration" type="text" placeholder="e.g., 24 hours, 7 days" className="mt-1" />
                 <p className="text-xs text-muted-foreground mt-1">From 1 minute to 31 days.</p>
              </div>
              <div>
                <Label htmlFor="pledge" className="text-lg">Pledge Amount (Optional)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="pledge" type="number" placeholder="0.00" className="pl-8" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Commit to your decision!</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full font-semibold">Publish Poll</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
