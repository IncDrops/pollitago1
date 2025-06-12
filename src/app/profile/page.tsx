import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Users, BarChart3 } from 'lucide-react';
import PollCard, { type Poll } from '@/components/polls/PollCard'; // Re-use PollCard for displaying user's polls

// Mock user data
const userProfile = {
  name: 'Alice Wonderland',
  username: '@alicew',
  avatarUrl: 'https://placehold.co/150x150.png',
  bio: 'Curiouser and curiouser! Exploring decisions one poll at a time. Join my adventures!',
  followers: 1250,
  following: 300,
  pollsCreated: 25,
};

// Mock polls created by this user
const userPolls: Poll[] = [
   {
    id: '1',
    creator: { name: userProfile.name, avatarUrl: userProfile.avatarUrl, profileUrl: '/profile/alice' },
    question: 'Engagement location in 14 days: Paris or Italy?',
    options: [
      { id: '1a', text: 'Paris, France', images: ['https://placehold.co/300x200.png'], votes: 120 },
      { id: '1b', text: 'Italy (Amalfi Coast)', images: ['https://placehold.co/300x200.png'], votes: 250 },
    ],
    endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 370,
    pledgeAmount: 50,
  },
  {
    id: 'user-poll-2',
    creator: { name: userProfile.name, avatarUrl: userProfile.avatarUrl, profileUrl: '/profile/alice' },
    question: 'Next travel destination: Japan or Australia?',
    options: [
      { id: 'up2a', text: 'Japan (Tokyo & Kyoto)', votes: 95 },
      { id: 'up2b', text: 'Australia (Sydney & Melbourne)', votes: 80 },
    ],
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 175,
  },
];


export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
          <CardHeader className="p-0">
            <div className="h-40 bg-gradient-to-r from-primary to-accent" data-ai-hint="abstract background">
              {/* Cover Image */}
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-32 w-32 border-4 border-card ring-2 ring-primary">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="profile person"/>
                <AvatarFallback className="text-4xl">{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center sm:text-left">
                <h1 className="text-3xl font-bold font-headline">{userProfile.name}</h1>
                <p className="text-muted-foreground">{userProfile.username}</p>
              </div>
              <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-foreground mb-6">{userProfile.bio}</p>
            <div className="flex space-x-6 mb-6 text-center sm:text-left justify-center sm:justify-start">
              <div>
                <p className="font-bold text-lg">{userProfile.pollsCreated}</p>
                <p className="text-sm text-muted-foreground">Polls</p>
              </div>
              <div>
                <p className="font-bold text-lg">{userProfile.followers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-bold text-lg">{userProfile.following.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>

            <Tabs defaultValue="my-polls" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
                <TabsTrigger value="my-polls">My Polls</TabsTrigger>
                <TabsTrigger value="voted-polls">Voted On</TabsTrigger>
                <TabsTrigger value="activity" className="hidden sm:inline-flex items-center">
                  <BarChart3 className="mr-1.5 h-4 w-4"/> Activity
                </TabsTrigger>
              </TabsList>
              <TabsContent value="my-polls" className="mt-6 space-y-6">
                {userPolls.map(poll => <PollCard key={poll.id} poll={poll} />)}
                {userPolls.length === 0 && <p className="text-muted-foreground text-center py-4">No polls created yet.</p>}
              </TabsContent>
              <TabsContent value="voted-polls" className="mt-6">
                <p className="text-muted-foreground text-center py-10">Polls you've voted on will appear here.</p>
              </TabsContent>
               <TabsContent value="activity" className="mt-6">
                <p className="text-muted-foreground text-center py-10">Your recent activity and stats.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
