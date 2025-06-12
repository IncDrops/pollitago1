import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageSquare, ExternalLink, Video } from 'lucide-react';

export interface PollOption {
  id: string;
  text: string;
  images?: string[]; // URLs of up to 2 images
  votes: number;
}

export interface Poll {
  id: string;
  creator: {
    name: string;
    avatarUrl?: string;
    profileUrl: string;
  };
  question: string;
  options: PollOption[];
  videoUrl?: string; // URL for up to 60s video
  endsAt: string; // ISO string or human-readable
  pledgeAmount?: number;
  totalVotes: number;
}

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const isTwoOptionPoll = poll.options.length === 2;

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
            <p className="text-xs text-muted-foreground">Ends: {new Date(poll.endsAt).toLocaleDateString()}</p>
          </div>
        </div>
        <Link href={`/polls/${poll.id}`} passHref>
          <CardTitle className="text-lg leading-tight cursor-pointer hover:text-primary transition-colors">
            {poll.question}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {poll.videoUrl && (
          <div className="mb-3 rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center text-muted-foreground">
            {/* In a real app, use a video player. For now, a placeholder. */}
            <Video className="w-12 h-12" />
            <span className="ml-2">Video context available</span>
          </div>
        )}

        <div className={`grid gap-2 ${poll.options.length > 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
          {poll.options.map((option) => (
            <div key={option.id} className="border border-border rounded-md p-3 bg-card hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="font-medium text-sm mb-1">{option.text}</p>
              {option.images && option.images.length > 0 && (
                <div className={`grid ${option.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-1`}>
                  {option.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-square rounded overflow-hidden">
                      <Image src={imgUrl} alt={`${option.text} image ${idx + 1}`} layout="fill" objectFit="cover" data-ai-hint="poll option" />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">{option.votes} votes</p>
            </div>
          ))}
        </div>
        
        {isTwoOptionPoll && (
          <div className="mt-3 text-center text-xs text-muted-foreground italic">
            Swipe left for "{poll.options[0].text}", right for "{poll.options[1].text}" or tap an option.
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        <div className="flex space-x-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4 mr-1" /> {poll.totalVotes}
          </Button>
          <Link href={`/polls/${poll.id}#comments`} passHref>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageSquare className="h-4 w-4 mr-1" /> Comments
            </Button>
          </Link>
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
