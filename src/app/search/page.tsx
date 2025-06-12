import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

export default function SearchPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center font-headline">Search Polls</h1>
        <div className="flex w-full max-w-lg mx-auto items-center space-x-2 mb-8">
          <Input type="search" placeholder="Search for polls, topics, or users..." className="flex-grow" />
          <Button type="submit" size="icon">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-center text-muted-foreground">
          <p>Search results will appear here.</p>
          <p className="mt-2">Try searching for keywords like "travel", "food", or a user's name.</p>
        </div>
      </div>
    </AppLayout>
  );
}
