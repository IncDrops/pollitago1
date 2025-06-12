"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, ExternalLink, Video, Flame, Gift } from 'lucide-react';
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

export interface PollOption {
  id: string;
  text: string;
  images?: string[];
  votes: number;
}

export interface AffiliateLink {
  title: string;
  url: string;
}

export interface PollCreator {
    id: string;
    name: string;
    avatarUrl?: string;
    profileUrl: string;
}

export interface Poll {
  id: string;
  creator: PollCreator;
  question: string;
  description?: string;
  options: PollOption[];
  videoUrl?: string;
  endsAt: string;
  pledgeAmount?: number;
  totalVotes: number;
  tipCount?: number;
  affiliateLinks?: AffiliateLink[];
  isSensitive?: boolean;
}

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const isTwoOptionPoll = poll.options.length === 2;
  const timeLeft = useCountdown(poll.endsAt);
  const [initialTipAmount] = useState('5.00');
  const [isTipDialogOpen, setIsTipDialogOpen] = useState(false);

  const truncatedDescription = poll.description && poll.description.length > 140
    ? poll.description.substring(0, 140) + "..."
    : poll.description;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Link href={poll.creator.profileUrl} passHref legacyBehavior>
            <a className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={poll.creator.avatarUrl} alt={poll.creator.name} data-ai-hint="anime character" />
                <AvatarFallback>{poll.creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </a>
          </Link>

          <div>
            <Link href={poll.creator.profileUrl} passHref legacyBehavior>
              <a>
                <p className="font-semibold text-sm hover:underline cursor-pointer">{poll.creator.name}</p>
              </a>
            </Link>
            <p className="text-xs text-muted-foreground">
              {timeLeft === 'Ended' ? 'Poll Ended' : `Ends in: ${timeLeft}`}
            </p>
          </div>
        </div>

        <div>
          <Link href={`/polls/${poll.id}`} passHref legacyBehavior>
            <a className="block">
              <CardTitle className="text-lg leading-tight cursor-pointer hover:text-primary transition-colors flex items-center">
                {poll.isSensitive && <Flame className="h-4 w-4 mr-1.5 text-destructive flex-shrink-0" />}
                <span>{poll.question}</span>
              </CardTitle>
            </a>
          </Link>
        </div>
        
        {poll.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {truncatedDescription}
            {poll.description && poll.description.length > 140 && (
              <Link href={`/polls/${poll.id}#description`} className="text-primary hover:underline ml-1">
                (see more)
              </Link>
            )}
          </p>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {poll.videoUrl && (
          <Link href={`/polls/${poll.id}`} passHref legacyBehavior>
            <a className="block mb-3 rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center text-muted-foreground border cursor-pointer">
              <Video className="w-12 h-12 text-primary" />
              <span className="ml-2">Watch video context</span>
            </a>
          </Link>
        )}

        <div className={`grid gap-2 ${poll.options.length > 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
          {poll.options.map((option) => (
            <Link key={option.id} href={`/polls/${poll.id}`} passHref legacyBehavior>
              <a>
                <div className="border border-border rounded-md p-3 bg-card hover:bg-muted/50 transition-colors cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <p className="font-medium text-sm mb-1">{option.text}</p>
                    {option.images && option.images.length > 0 && (
                      <div className={`grid ${option.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-1 mb-2`}>
                        {option.images.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded overflow-hidden border">
                            <Image 
                              src={imgUrl} 
                              alt={`${option.text} image ${idx + 1}`} 
                              fill 
                              style={{ objectFit: 'cover' }} 
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw" 
                              data-ai-hint="poll option" 
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 self-start">{option.votes} votes</p>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {isTwoOptionPoll && (
          <div className="mt-3 text-center text-xs text-muted-foreground italic">
            Tap an option to vote or swipe (left for "{poll.options[0].text}", right for "{poll.options[1].text}").
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 flex flex-wrap justify-between items-center border-t border-border gap-2">
        <div className="flex space-x-1 sm:space-x-2 items-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4 mr-1" /> {poll.totalVotes}
          </Button>
          <Link href={`/polls/${poll.id}#comments`} passHref legacyBehavior>
            <a>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MessageSquare className="h-4 w-4 mr-1" /> Comments
              </Button>
            </a>
          </Link>
          {typeof poll.tipCount === 'number' && poll.tipCount > 0 && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Gift className="h-4 w-4 mr-1 text-accent" /> {poll.tipCount} Tips
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
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
                recipientId={poll.creator.id}
                pollId={poll.id}
                onCancel={() => setIsTipDialogOpen(false)}
                onSuccessfulTip={() => {
                  setIsTipDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Link href={`/polls/${poll.id}`} passHref legacyBehavior>
            <a>
              <Button variant="outline" size="sm">
                View Details <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </a>
          </Link>
        </div>
      </CardFooter>
      {poll.pledgeAmount && poll.pledgeAmount > 0 && (
        <div className="px-4 py-2 bg-accent/20 text-center text-sm font-medium text-accent-foreground">
          Pledge: ${poll.pledgeAmount.toFixed(2)}
        </div>
      )}
    </Card>
  );
}