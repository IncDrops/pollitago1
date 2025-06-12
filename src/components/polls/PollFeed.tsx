import PollCard, { type Poll } from './PollCard';

// Mock data for polls
const mockPolls: Poll[] = [
  {
    id: '1',
    creator: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/alice' },
    question: 'Engagement location in 14 days: Paris or Italy?',
    options: [
      { id: '1a', text: 'Paris, France', images: ['https://placehold.co/300x200.png', 'https://placehold.co/300x200.png'], votes: 120 },
      { id: '1b', text: 'Italy (Amalfi Coast)', images: ['https://placehold.co/300x200.png'], votes: 250 },
    ],
    endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 370,
    pledgeAmount: 50,
  },
  {
    id: '2',
    creator: { name: 'Bob The Builder', profileUrl: '/profile/bob' },
    question: 'Which house to buy? Option A or Option B?',
    options: [
      { id: '2a', text: 'Modern Downtown Condo', images: ['https://placehold.co/600x400.png'], votes: 75 },
      { id: '2b', text: 'Suburban House with Yard', images: ['https://placehold.co/600x400.png'], votes: 90 },
    ],
    videoUrl: 'https://example.com/video_context.mp4', // Placeholder
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 165,
  },
  {
    id: '3',
    creator: { name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/charlie' },
    question: 'What to eat for lunch?',
    options: [
      { id: '3a', text: 'Tuna Sandwich', votes: 30 },
      { id: '3b', text: 'Grilled Chicken Wrap', votes: 45 },
      { id: '3c', text: 'Sushi Platter', votes: 60 },
      { id: '3d', text: 'Leftover Pizza', votes: 15 },
    ],
    endsAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour
    totalVotes: 150,
    pledgeAmount: 5,
  },
   {
    id: '4',
    creator: { name: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/diana' },
    question: 'Dress for New Orleans Jazz Festival?',
    options: [
      { id: '4a', text: 'Boho Chic Dress', images: ['https://placehold.co/300x400.png', 'https://placehold.co/300x400.png'], votes: 180 },
      { id: '4b', text: 'Colorful Jumpsuit', images: ['https://placehold.co/300x400.png'], votes: 150 },
    ],
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 330,
  },
];


export default function PollFeed() {
  // In a real app, polls would be fetched, potentially with infinite scrolling
  const polls = mockPolls;

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
      {/* Placeholder for infinite scroll loading indicator */}
      {/* <div className="text-center py-4">Loading more polls...</div> */}
    </div>
  );
}
