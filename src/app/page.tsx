import AppLayout from '@/components/layout/AppLayout';
import PollFeed from '@/components/polls/PollFeed';

export default function HomePage() {
  return (
    <AppLayout>
      <PollFeed />
    </AppLayout>
  );
}
