
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ThumbsUp, MessageSquare, ExternalLink, Video, CheckCircle, XCircle, Users, Flame, Gift, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Poll, PollOption, AffiliateLink, PollCreator } from '@/components/polls/PollCard'; // Updated import
import { useCountdown } from '@/hooks/useCountdown';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { StripeTipFormWrapperProps } from '@/components/stripe/StripeTipForm';
import dynamic from 'next/dynamic';

const StripeTipFormWrapper = dynamic<StripeTipFormWrapperProps>(
  () => import('@/components/stripe/StripeTipForm').then(mod => mod.StripeTipFormWrapper),
  { ssr: false, loading: () => <p className="p-4 text-center">Loading payment form...</p> }
);

const mockCreators: Record<string, PollCreator> = {
  alice: { id: 'userAlice123', name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/alice' },
  eve: { id: 'userEve112', name: 'Eve F.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/eve' },
};

// Mock poll data for detail view
const mockPollsList: Poll[] = [
  {
    id: '1',
    creator: mockCreators.alice,
    question: 'Engagement location in 14 days: Paris or Italy?',
    description: "He's planning to propose soon and we're torn between these two iconic romantic destinations! Paris offers city charm and landmarks, while the Amalfi Coast has stunning views and a relaxed vibe. Help us decide for our trip 12 days from now! We're also looking for hotel recommendations and tour packages, check out the links if you have suggestions!",
    options: [
      { id: '1a', text: 'Paris, France', images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], votes: 120 },
      { id: '1b', text: 'Italy (Amalfi Coast)', images: ['https://placehold.co/600x400.png'], votes: 250 },
    ],
    videoUrl: 'https://example.com/paris_vs_italy.mp4',
    endsAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 370,
    pledgeAmount: 50,
    isSensitive: false,
    tipCount: 12,
    affiliateLinks: [
        { title: "Book Paris Hotels on Expedia", url: "https://www.expedia.com/Paris-Hotels.d178293.Travel-Guide-Hotels" },
        { title: "Amalfi Coast Tour Packages", url: "https://www.viator.com/Amalfi-Coast-tours/d946-ttd" }
    ],
  },
   {
    id: '5',
    creator: mockCreators.eve,
    question: 'Losing my virginity, condom or no condom?',
    description: "This is a big step for me and I want to make an informed decision. Safety vs. sensation, what are your thoughts? Poll ends in 7 days. I've linked some resources I found helpful below.",
    options: [
      { id: '5a', text: 'Condom', votes: 230 },
      { id: '5b', text: 'No Condom', votes: 45 },
    ],
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 275,
    isSensitive: true,
    tipCount: 5,
    affiliateLinks: [
        { title: "Sexual Health Info - Planned Parenthood", url: "https://www.plannedparenthood.org/learn/sexual-health" },
        { title: "Condom Variety Packs on Amazon", url: "https://www.amazon.com/s?k=condom+variety+pack" }
    ]
  },
];


const getVotePercentage = (votes: number, totalVotes: number) => {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 100);
};

const mockComments = [
    { id: 'c1', user: { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png' }, text: 'Italy for sure! The romance is unmatched.', timestamp: '2d ago' },
    { id: 'c2', user: { name: 'Charlie Brown', avatarUrl: 'https://placehold.co/40x40.png' }, text: 'Paris is classic, but Amalfi Coast offers unique beauty.', timestamp: '1d ago' },
];

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const poll = mockPollsList.find(p => p.id === params.id) || mockPollsList[0]; // Fallback to first poll if not found
  const winningOption = poll.options.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
  const timeLeft = useCountdown(poll.endsAt);
  const [initialTipAmount] = useState('5.00');
  const [isTipDialogOpen, setIsTipDialogOpen] = useState(false);
  
  // Simulate creator's decision after poll ends
  const [creatorDecision, setCreatorDecision] = useState<'accepted' | 'rejected' | undefined>(undefined);

  useEffect(() => {
    if (timeLeft === 'Ended' && !creatorDecision) {
      // Only set decision once after poll ends
      setCreatorDecision(Math.random() > 0.5 ? 'accepted' : 'rejected');
    }
  }, [timeLeft, creatorDecision]);


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
                  <AvatarImage src={poll.creator.avatarUrl} alt={poll.creator.name} data-ai-hint="anime character"/>
                  <AvatarFallback>{poll.creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={poll.creator.profileUrl} passHref>
                  <p className="font-semibold text-lg hover:underline cursor-pointer">{poll.creator.name}</p>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {timeLeft === 'Ended' ? 'Poll Ended' : `Ends in: ${timeLeft}`}
                </p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold font-headline flex items-center">
              {poll.isSensitive && <Flame className="h-5 w-5 mr-2 text-destructive flex-shrink-0" title="Sensitive Content"/>}
              <span>{poll.question}</span>
            </CardTitle>
            {poll.pledgeAmount && (
              <CardDescription className="text-base text-accent font-medium">Pledge: ${poll.pledgeAmount.toFixed(2)}</CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {poll.description && (
              <div id="description" className="text-foreground prose dark:prose-invert">
                <h4 className="text-lg font-semibold mb-1">Poll Description:</h4>
                <p>{poll.description}</p>
              </div>
            )}
             <Separator className={poll.description ? 'my-6' : 'mb-6'}/>


            {poll.videoUrl && (
              <div className="rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center text-muted-foreground border">
                {/* In a real app, this would be a video player component */}
                <Video className="w-16 h-16 text-primary" />
                <span className="ml-3 text-lg">Watch video context</span>
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

            {creatorDecision && (
              <div className={`p-4 rounded-md flex items-center space-x-3 ${creatorDecision === 'accepted' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'} border`}>
                {creatorDecision === 'accepted' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                <div>
                  <p className="font-semibold">{poll.creator.name} {creatorDecision === 'accepted' ? 'accepted' : 'rejected'} the crowd's decision.</p>
                  {creatorDecision === 'accepted' && <p className="text-sm">They went with "{winningOption.text}"!</p>}
                  {creatorDecision === 'rejected' && poll.pledgeAmount && <p className="text-sm">The ${poll.pledgeAmount.toFixed(2)} pledge was activated. Voters may have been tipped!</p>}
                </div>
              </div>
            )}

            {(poll.affiliateLinks && poll.affiliateLinks.length > 0) && (
              <>
                <Separator />
                <div>
                    <h4 className="text-lg font-semibold my-3">Related Products/Services:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {poll.affiliateLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                                <LinkIcon className="h-5 w-5 text-primary" />
                                <span className="text-sm hover:underline">{link.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
              </>
            )}
             <Separator />

            <div id="comments">
              <h4 className="text-xl font-semibold mb-3">Comments ({mockComments.length})</h4>
              <div className="space-y-4 mb-4">
                {mockComments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} data-ai-hint="anime character"/>
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

          <CardFooter className="flex flex-wrap justify-between items-center border-t pt-4 gap-2">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-5 w-5"/>
              <span>{poll.totalVotes} total votes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary">
                <ThumbsUp className="h-4 w-4 mr-2" /> Like Poll
              </Button>
              <Dialog open={isTipDialogOpen} onOpenChange={setIsTipDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Gift className="h-4 w-4 mr-2" /> Tip {poll.creator.name} {poll.tipCount && poll.tipCount > 0 ? `(${poll.tipCount})` : ''}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tip {poll.creator.name}</DialogTitle>
                    <DialogDescription>
                      Show your appreciation! Your tip (minimum $1.00) will go directly to {poll.creator.name}.
                      PollItAGo takes a small platform fee. PollitPoints will be awarded.
                    </DialogDescription>
                  </DialogHeader>
                   <StripeTipFormWrapper
                    initialTipAmount={initialTipAmount}
                    creatorName={poll.creator.name}
                    recipientId={poll.creator.id} // Pass creator's ID
                    pollId={poll.id}
                    onCancel={() => setIsTipDialogOpen(false)}
                    onSuccessfulTip={() => {
                      setIsTipDialogOpen(false);
                      // TODO: Optionally update tipCount locally or refetch poll data
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
