import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from './FirebaseContext';

/**
 * PollList Component
 *
 * Displays a list of mock polls. Each poll can be selected to view details.
 * Will be wired to Firestore later.
 */
const PollList = ({ onSelectPoll }) => {
  const { isAuthReady } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);

  // Temporary mock polls for testing layout and features
  const mockPolls = [
    {
      id: '1',
      question: 'Which outfit for Paris?',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      options: [
        {
          text: 'Red Dress',
          imageUrls: [
            'https://images.unsplash.com/photo-1602810318002-40fc91e29c3d',
            'https://images.unsplash.com/photo-1602810318004-ade6bdf39c12'
          ]
        },
        {
          text: 'Black Blazer',
          imageUrls: [
            'https://images.unsplash.com/photo-1520975916090-3105956fcd61',
            'https://images.unsplash.com/photo-1520975916089-3de2b1e4cbcc'
          ]
        }
      ]
    },
    {
      id: '2',
      question: 'Where should I move next year?',
      videoUrl: null,
      options: [
        {
          text: 'New York City',
          imageUrls: ['https://images.unsplash.com/photo-1562101041-ec9f71a2d68e']
        },
        {
          text: 'San Diego',
          imageUrls: ['https://images.unsplash.com/photo-1597751295433-1a7559b8c57e']
        }
      ]
    }
  ];

  useEffect(() => {
    if (isAuthReady) {
      setLoading(false);
    }
  }, [isAuthReady]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Loading polls...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 font-inter">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Available Polls</h1>

        {mockPolls.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No polls available yet.</p>
        ) : (
          mockPolls.map((poll) => (
            <div
              key={poll.id}
              onClick={() => onSelectPoll(poll)}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700
                         hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out
                         cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {poll.question}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Options: {poll.options.length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Poll ID: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">{poll.id}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PollList;
