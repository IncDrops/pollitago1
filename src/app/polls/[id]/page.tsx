import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ThumbsUp, MessageSquare, ExternalLink, Video, CheckCircle, XCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Poll, PollOption } from '@/components/polls/PollCard'; // Re-use types

// Mock poll data for detail view
const mockPollDetail: Poll & { comments: any[], creatorDecision?: 'accepted' | 'rejected' } = {
  id: '1',
  creator: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/alice' },
  question: 'Engagement location in 14 days: Paris or Italy?',
  options: [
    { id: '1a', text: 'Paris, France', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], votes: 120 },
    { id: '1b', text: 'Italy (Amalfi Coast)', images: ['https://placehold.co/600x400.png'], votes: 250 },
  ],
  videoUrl: 'https://example.com/paris_vs_italy.mp4',
  endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  totalVotes: 370,
  pledgeAmount: 50,
  creatorDecision: 'accepted', // or 'rejected' or undefined if poll active
  comments: [
    { id: 'c1', user: { name: 'Bob', avatarUrl: 'https://placehold.co/40x40.png' }, text: 'Italy for sure! The romance is unmatched.', timestamp: '2d ago' },
    { id: 'c2', user: { name: 'Charlie', avatarUrl: 'https://placehold.co/40x40.png' }, text: 'Paris is classic, but Amalfi Coast offers unique beauty.', timestamp: '1d ago' },
  ],
};

const getVotePercentage = (votes: number, totalVotes: number) => {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 100);
};

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const poll = mockPollDetail; // In a real app, fetch poll by params.id
  const winningOption = poll.options.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Feed
        </Link>

        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <div className="flex items-start space-x-3 mb-3">
              <Link href={poll.creator.profileUrl} passHref>
                <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarImage src={poll.creator.avatarUrl} alt={poll.creator.name} data-ai-hint="profile person"/>
                  <AvatarFallback>{poll.creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={poll.creator.profileUrl} passHref>
                  <p className="font-semibold text-lg hover:underline cursor-pointer">{poll.creator.name}</p>
                </Link>
                <p className="text-sm text-muted-foreground">Ends: {new Date(poll.endsAt).toLocaleString()}</p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold font-headline">{poll.question}</CardTitle>
            {poll.pledgeAmount && (
              <CardDescription className="text-base text-accent font-medium">Pledge: ${poll.pledgeAmount.toFixed(2)}</CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {poll.videoUrl && (
              <div className="rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center text-muted-foreground border">
                <Video className="w-16 h-16 text-primary" />
                <span className="ml-3 text-lg">Watch video context</span>
                {/* Placeholder - In real app, clicking this would play the video in a modal or inline */}
              </div>
            )}

            <div className="space-y-4">
              {poll.options.map((option) => (
                <div key={option.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{option.text}</h4>
                    <span className="text-sm font-medium text-primary">{getVotePercentage(option.votes, poll.totalVotes)}%</span>
                  </div>
                  <Progress value={getVotePercentage(option.votes, poll.totalVotes)} className="h-3 mb-3" />
                  {option.images && option.images.length > 0 && (
                     <div className={`grid ${option.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-2`}>
                      {option.images.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-video rounded-md overflow-hidden border">
                          <Image src={imgUrl} alt={`${option.text} image ${idx + 1}`} layout="fill" objectFit="cover" data-ai-hint="poll option image"/>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full mt-3">Vote for "{option.text}"</Button>
                </div>
              ))}
            </div>

            {poll.creatorDecision && (
              <div className={`p-4 rounded-md flex items-center space-x-3 ${poll.creatorDecision === 'accepted' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'} border`}>
                {poll.creatorDecision === 'accepted' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                <div>
                  <p className="font-semibold">{poll.creator.name} {poll.creatorDecision === 'accepted' ? 'accepted' : 'rejected'} the crowd's decision.</p>
                  {poll.creatorDecision === 'accepted' && <p className="text-sm">They went with "{winningOption.text}"!</p>}
                  {poll.creatorDecision === 'rejected' && poll.pledgeAmount && <p className="text-sm">The ${poll.pledgeAmount.toFixed(2)} pledge was activated. Voters have been tipped!</p>}
                </div>
              </div>
            )}
            
            <Separator />

            {/* Affiliate Links Section Placeholder */}
            <div>
                <h4 className="text-lg font-semibold mb-2">Related Products/Services:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        <span className="text-sm">Book Paris Hotels</span>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        <span className="text-sm">Italy Travel Packages</span>
                    </a>
                </div>
            </div>
             <Separator />
            {/* Comments Section */}
            <div id="comments">
              <h4 className="text-xl font-semibold mb-3">Comments ({poll.comments.length})</h4>
              <div className="space-y-4 mb-4">
                {poll.comments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} data-ai-hint="profile person"/>
                      <AvatarFallback>{comment.user.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/50 p-3 rounded-lg flex-grow">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-sm">{comment.user.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Textarea placeholder="Add your comment..." className="min-h-[80px]" />
              <Button className="mt-2">Post Comment</Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center border-t pt-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-5 w-5"/>
              <span>{poll.totalVotes} total votes</span>
            </div>
            <Button variant="secondary">
              <ThumbsUp className="h-4 w-4 mr-2" /> Like Poll
            </Button>
            {/* Tip Creator Button Placeholder */}
            <Button variant="outline" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Tip {poll.creator.name}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
