
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, ExternalLink, Video, Flame, Gift } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { useState } from 'react';

export interface PollOption {
  id: string;
  text: string;
  images?: string[]; // URLs of up to 2 images
  votes: number;
}

export interface AffiliateLink {
  title: string;
  url: string;
}

export interface Poll {
  id: string;
  creator: {
    name: string;
    avatarUrl?: string;
    profileUrl: string;
  };
  question: string;
  description?: string;
  options: PollOption[];
  videoUrl?: string; // URL for up to 60s video
  endsAt: string; // ISO string
  pledgeAmount?: number;
  totalVotes: number;
  tipCount?: number;
  affiliateLinks?: AffiliateLink[];
  isSensitive?: boolean; // Flag for NSFW/spicy content
}

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const isTwoOptionPoll = poll.options.length === 2;
  const timeLeft = useCountdown(poll.endsAt);

  const truncatedDescription = poll.description && poll.description.length > 140 
    ? poll.description.substring(0, 140) + "..." 
    : poll.description;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Link href={poll.creator.profileUrl} passHref>
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src={poll.creator.avatarUrl} alt={poll.creator.name} data-ai-hint="profile person" />
              <AvatarFallback>{poll.creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={poll.creator.profileUrl} passHref>
              <p className="font-semibold text-sm hover:underline cursor-pointer">{poll.creator.name}</p>
            </Link>
            <p className="text-xs text-muted-foreground">
              {timeLeft === 'Ended' ? 'Poll Ended' : `Ends in: ${timeLeft}`}
            </p>
          </div>
        </div>
        <Link href={`/polls/${poll.id}`} passHref>
          <CardTitle className="text-lg leading-tight cursor-pointer hover:text-primary transition-colors flex items-center">
            {poll.isSensitive && <Flame className="h-4 w-4 mr-1.5 text-destructive flex-shrink-0" title="Sensitive Content"/>}
            <span>{poll.question}</span>
          </CardTitle>
        </Link>
        {poll.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {truncatedDescription}
            {poll.description.length > 140 && (
              <Link href={`/polls/${poll.id}#description`} className="text-primary hover:underline ml-1">
                (see more)
              </Link>
            )}
          </p>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {poll.videoUrl && (
          <Link href={`/polls/${poll.id}`} passHref>
            <div className="mb-3 rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center text-muted-foreground border cursor-pointer">
              <Video className="w-12 h-12 text-primary" />
              <span className="ml-2">Watch video context</span>
            </div>
          </Link>
        )}

        <div className={`grid gap-2 ${poll.options.length > 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
          {poll.options.map((option) => (
             <Link key={option.id} href={`/polls/${poll.id}`} passHref>
              <div className="border border-border rounded-md p-3 bg-card hover:bg-muted/50 transition-colors cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <p className="font-medium text-sm mb-1">{option.text}</p>
                  {option.images && option.images.length > 0 && (
                    <div className={`grid ${option.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-1 mb-2`}>
                      {option.images.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded overflow-hidden border">
                          <Image src={imgUrl} alt={`${option.text} image ${idx + 1}`} layout="fill" objectFit="cover" data-ai-hint="poll option" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 self-start">{option.votes} votes</p>
              </div>
            </Link>
          ))}
        </div>
        
        {isTwoOptionPoll && (
          <div className="mt-3 text-center text-xs text-muted-foreground italic">
            Tap an option to vote or swipe (left for "{poll.options[0].text}", right for "{poll.options[1].text}").
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        <div className="flex space-x-1 sm:space-x-3 items-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4 mr-1" /> {poll.totalVotes}
          </Button>
          <Link href={`/polls/${poll.id}#comments`} passHref>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageSquare className="h-4 w-4 mr-1" /> Comments
            </Button>
          </Link>
          {typeof poll.tipCount === 'number' && poll.tipCount > 0 && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Gift className="h-4 w-4 mr-1 text-accent" /> {poll.tipCount} Tips
            </div>
          )}
        </div>
        <Link href={`/polls/${poll.id}`} passHref>
           <Button variant="outline" size="sm">
            View Details <ExternalLink className="h-3 w-3 ml-1.5" />
          </Button>
        </Link>
      </CardFooter>
      {poll.pledgeAmount && poll.pledgeAmount > 0 && (
        <div className="px-4 py-2 bg-accent/20 text-center text-sm font-medium text-accent-foreground">
          Pledge: ${poll.pledgeAmount.toFixed(2)}
        </div>
      )}
    </Card>
  );
}
