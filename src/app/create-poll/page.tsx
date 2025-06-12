
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, ImagePlus, Video, CalendarDays, DollarSign, Info, Flame } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function CreatePollPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full md:max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center font-headline">Create New Poll</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="question" className="text-lg">Your Question</Label>
              <Textarea id="question" placeholder="e.g., Which movie should I watch tonight?" className="mt-1 min-h-[80px]" />
            </div>

            <div>
              <Label htmlFor="description" className="text-lg">Description (Optional)</Label>
              <Textarea id="description" placeholder="Add more context or details to your poll (max 365 characters)." className="mt-1 min-h-[100px]" maxLength={365} />
               <p className="text-xs text-muted-foreground mt-1">Provide background, explain your dilemma, or add fun details.</p>
            </div>


            <div className="space-y-3">
              <Label className="text-lg">Options (2 to 4)</Label>
              {[1, 2].map((i) => ( 
                <div key={i} className="space-y-2 p-3 border rounded-md">
                  <Input placeholder={`Option ${i}`} />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm"><ImagePlus className="mr-2 h-4 w-4" /> Add Image (Max 2 per option)</Button>
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
                <Label className="text-lg mb-1 block">Poll Duration</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="duration-days" className="text-xs">Days</Label>
                    <Select defaultValue="0">
                      <SelectTrigger id="duration-days">
                        <SelectValue placeholder="Days" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 32 }, (_, i) => ( // 0 to 31 days
                          <SelectItem key={`days-${i}`} value={String(i)}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration-hours" className="text-xs">Hours</Label>
                    <Select defaultValue="0">
                      <SelectTrigger id="duration-hours">
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => ( // 0 to 23 hours
                          <SelectItem key={`hours-${i}`} value={String(i)}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration-minutes" className="text-xs">Minutes</Label>
                    <Select defaultValue="1"> {/* Default to 1 minute */}
                      <SelectTrigger id="duration-minutes">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => ( // 0 to 59 minutes
                          <SelectItem key={`minutes-${i}`} value={String(i)}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Min 1 minute, Max 31 days.</p>
              </div>

              <div>
                <Label htmlFor="pledge" className="text-lg">Pledge Amount (Optional)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="pledge" type="number" placeholder="0.00" className="pl-8" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Commit to your decision! If you go against the poll, pledge gets distributed.</p>
              </div>
            </div>
             <div className="space-y-2">
                <Label className="text-lg">Additional Settings</Label>
                <div className="flex items-center space-x-2">
                    <Checkbox id="isSensitive" />
                    <Label htmlFor="isSensitive" className="text-sm font-normal">
                        Mark as sensitive content (e.g., NSFW, adult themes)
                    </Label>
                </div>
                 <div className="p-2 bg-muted/50 rounded-md text-xs text-muted-foreground flex items-start space-x-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary"/>
                    <span>Polls marked sensitive will display a <Flame className="inline h-3 w-3 text-destructive"/> icon and may be subject to stricter moderation.</span>
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
