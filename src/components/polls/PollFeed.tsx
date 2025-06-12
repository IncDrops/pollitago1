
import PollCard, { type Poll } from './PollCard';

// Helper to calculate future dates
const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
const hoursFromNow = (hours: number) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
const minutesFromNow = (minutes: number) => new Date(Date.now() + minutes * 60 * 1000).toISOString();

// Mock data for polls
const mockPolls: Poll[] = [
  {
    id: '1',
    creator: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/alice' },
    question: 'Engagement location in two weeks: Paris or Italy?',
    description: "He's planning to propose soon and we're torn between these two iconic romantic destinations! Paris offers city charm and landmarks, while the Amalfi Coast has stunning views and a relaxed vibe. Help us decide for our trip 12 days from now!",
    options: [
      { id: '1a', text: 'Paris, France', images: ['https://placehold.co/300x200.png', 'https://placehold.co/300x200.png'], votes: 125, },
      { id: '1b', text: 'Italy (Amalfi Coast)', images: ['https://placehold.co/300x200.png'], votes: 260 },
    ],
    endsAt: daysFromNow(12),
    totalVotes: 385,
    pledgeAmount: 50,
    tipCount: 12,
    affiliateLinks: [
      { title: "Book Paris Hotels on Expedia", url: "#" },
      { title: "Amalfi Coast Tours", url: "#" }
    ]
  },
  {
    id: '5', 
    creator: { name: 'Eve F.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/eve' },
    question: 'Losing my virginity, condom or no condom?',
    description: "This is a big step for me and I want to make an informed decision. Safety vs. sensation, what are your thoughts? Poll ends in 7 days.",
    options: [
      { id: '5a', text: 'Condom', votes: 230 },
      { id: '5b', text: 'No Condom', votes: 45 },
    ],
    endsAt: daysFromNow(7),
    totalVotes: 275,
    isSensitive: true,
    tipCount: 5,
    affiliateLinks: [
        { title: "Sexual Health Info - Planned Parenthood", url: "https://www.plannedparenthood.org/learn/sexual-health" },
        { title: "Condom Variety Packs on Amazon", url: "https://www.amazon.com/s?k=condom+variety+pack" }
    ]
  },
  {
    id: '2',
    creator: { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/bob' },
    question: 'Which house to buy? Option A or Option B?',
    description: "We've narrowed it down to two potential homes. Option A is a sleek modern condo downtown, and Option B is a spacious suburban house with a big yard. Both have pros and cons. Check out the video walkthrough! Poll ends in 30 days.",
    options: [
      { id: '2a', text: 'Modern Downtown Condo', images: ['https://placehold.co/600x400.png'], votes: 180 },
      { id: '2b', text: 'Suburban House with Yard', images: ['https://placehold.co/600x400.png'], votes: 210 },
    ],
    videoUrl: 'https://example.com/video_context.mp4',
    endsAt: daysFromNow(30),
    totalVotes: 390,
    tipCount: 2,
    affiliateLinks: [
      { title: "Mortgage Calculator", url: "#" },
      { title: "Home Inspection Services", url: "#" }
    ]
  },
  {
    id: '3',
    creator: { name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/charlie' },
    question: 'What to eat for lunch? Tuna sandwich or grilled chicken wrap?',
    description: "Quick decision needed! Got a craving but can't decide. Poll ends in literally 1 minute!",
    options: [ 
      { id: '3a', text: 'Tuna sandwich', votes: 70 },
      { id: '3b', text: 'Grilled chicken wrap', votes: 90 },
    ],
    endsAt: minutesFromNow(1),
    totalVotes: 160,
    pledgeAmount: 5,
  },
   {
    id: '4',
    creator: { name: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/diana' },
    question: 'Dress for the New Orleans Jazz Festival?',
    description: "Heading to NOLA for Jazz Fest in 2 weeks! Which of these two outfits screams 'jazzy and fun' more? Need your fashion expertise!",
    options: [
      { id: '4a', text: 'Boho Chic Dress', images: ['https://placehold.co/300x400.png', 'https://placehold.co/300x400.png'], votes: 200 },
      { id: '4b', text: 'Colorful Jumpsuit', images: ['https://placehold.co/300x400.png'], votes: 180 },
    ],
    endsAt: daysFromNow(14),
    totalVotes: 380,
    tipCount: 8,
  },
  {
    id: '6',
    creator: { name: 'Frank G.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/frank' },
    question: 'Should I quit my job? Yes or No?',
    description: "Been feeling unfulfilled at my current job for a while now. Thinking of taking the plunge and looking for something new, but it's a big risk. Poll ends in 12 days.",
    options: [
      { id: '6a', text: 'Yes, take the leap!', votes: 160 },
      { id: '6b', text: 'No, play it safe for now.', votes: 110 },
    ],
    endsAt: daysFromNow(12),
    totalVotes: 270,
    pledgeAmount: 20,
    tipCount: 3,
  },
  {
    id: '7',
    creator: { name: 'Grace H.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/grace' },
    question: 'Which career path should I pursue? Tech or Art?',
    description: "At a crossroads in my life. One path offers stability and innovation, the other passion and creativity. Which direction should I head? This poll will run for 21 days.",
    options: [
      { id: '7a', text: 'Tech (Stability & Innovation)', images: ['https://placehold.co/300x200.png'], votes: 310 },
      { id: '7b', text: 'Art (Passion & Creativity)', images: ['https://placehold.co/300x200.png'], votes: 265 },
    ],
    endsAt: daysFromNow(21),
    totalVotes: 575,
    tipCount: 15,
  },
  {
    id: '8',
    creator: { name: 'Hannah I.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/hannah' },
    question: 'Should I break up with my boyfriend? Yes or No?',
    description: "Things haven't been great lately and I'm wondering if it's time to move on. This is a tough one. Need your input over the next 4 days.",
    options: [
      { id: '8a', text: "Yes, it's time to move on.", votes: 95 },
      { id: '8b', text: 'No, try to work things out.', votes: 70 },
    ],
    endsAt: daysFromNow(4),
    totalVotes: 165,
    isSensitive: true,
  },
  {
    id: '9',
    creator: { name: 'Hannah I.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/hannah' }, 
    question: 'Should we get back together?! Quick poll!',
    description: "Okay, so the breakup happened... but now I'm having second thoughts. Impulsive, I know! What do you all think? Only 30 minutes to vote on this rollercoaster!",
    options: [
      { id: '9a', text: 'Yes, give it another shot!', votes: 30 },
      { id: '9b', text: 'No, remember why we broke up!', votes: 85 },
    ],
    endsAt: minutesFromNow(30),
    totalVotes: 115,
    tipCount: 1,
  },
  {
    id: '10',
    creator: { name: 'Ian J.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/ian' },
    question: "Should I try to reunite with a relative I haven't gotten along with in years?",
    description: "There's been a long-standing rift with a family member. Part of me wants to mend fences, but another part is hesitant. What's the collective wisdom? Poll open for 10 days.",
    options: [
      { id: '10a', text: 'Yes, reach out and try.', votes: 130 },
      { id: '10b', text: 'No, some bridges are best left uncrossed.', votes: 100 },
    ],
    endsAt: daysFromNow(10),
    totalVotes: 230,
  },
  {
    id: '11',
    creator: { name: 'Julia K.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/julia' },
    question: 'My husband cheated, should I stay and try to work it out with therapy or take this as a sign to run?',
    description: "Devastated right now. Found out about the affair and I'm completely lost. Is this something that can be fixed with professional help, or is it a dealbreaker? Need advice ASAP, poll ends in 8 hours.",
    options: [
      { id: '11a', text: 'Stay & Therapy', votes: 190 },
      { id: '11b', text: "Run (It's a sign)", votes: 235 },
    ],
    endsAt: hoursFromNow(8),
    totalVotes: 425,
    pledgeAmount: 100,
    isSensitive: true,
    tipCount: 25,
  },
  {
    id: '12',
    creator: { name: 'Kevin L.', avatarUrl: 'https://placehold.co/100x100.png', profileUrl: '/profile/kevin' },
    question: 'These jeans feel tight... Workout more or buy new jeans?', 
    description: "My favorite jeans are feeling a bit snug. Time to hit the gym more, or just embrace comfort and size up? You have 3 days to help me decide.",
    options: [
      { id: '12a', text: 'Workout more!', images: ['https://placehold.co/300x200.png'], votes: 100 }, 
      { id: '12b', text: 'Buy new jeans!', images: ['https://placehold.co/300x200.png'], votes: 120 }, 
    ],
    endsAt: daysFromNow(3),
    totalVotes: 220,
    tipCount: 4,
  },
];


export default function PollFeed() {
  const polls = mockPolls;

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}

