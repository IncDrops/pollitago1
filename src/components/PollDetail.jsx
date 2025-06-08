import React, { useState } from 'react';

const PollDetail = ({ poll, currentUserId, onBackToList, showMessage, onTipSuccess }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = (option) => {
    setSelectedOption(option);
    setVoted(true);
    showMessage(`You voted for "${option.text}"`, 'success');
    // Trigger confetti after vote
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full space-y-6">

        {/* Optional Poll Video */}
        {poll.videoUrl && (
          <video
            src={poll.videoUrl}
            controls
            className="w-full rounded-lg shadow-md mb-4 max-h-64 object-cover"
          />
        )}

        {/* Poll Question */}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {poll.question}
        </h2>

        {/* Poll Options */}
        <div className="space-y-4">
          {poll.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleVote(option)}
              className={`w-full px-4 py-3 text-left font-medium rounded-lg border transition duration-300 ease-in-out flex flex-col items-start space-y-2
                ${selectedOption === option ? 'bg-green-500 text-white animate-bounce' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'}`}
            >
              {/* Option Images (if any) */}
              {option.imageUrls && option.imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full">
                  {option.imageUrls.slice(0, 2).map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Option ${idx + 1} - Image ${index + 1}`}
                      className="w-1/2 h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              {/* Option Text */}
              <span className="text-lg mt-2 block">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Vote Confirmation Bar */}
        {voted && (
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden animate-in fade-in duration-500">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
        )}

        {/* Nav and Tip Buttons */}
        <div className="pt-4 flex justify-between items-center">
          <button onClick={onBackToList} className="text-sm text-blue-600 hover:underline">← Back to Polls</button>
          <button
            onClick={() => onTipSuccess(2)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 animate-in fade-in slide-in-from-top-2"
          >
            Tip the Crowd ($2)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollDetail;
