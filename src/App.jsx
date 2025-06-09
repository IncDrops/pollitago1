// src/App.jsx
import React, { useState } from 'react';
import PollList from './components/PollList.jsx';
import PollDetail from './components/PollDetail.jsx'; // only if you have this component
import { FirebaseProvider } from './components/FirebaseContext.js';
import './components/PollCard.css'; // if you’ve styled cards here
import { seedDummyPolls } from './utils/seedDummyPolls'; // optional, remove if not seeding

const App = () => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleTipSuccess = (amount) => {
    showMessage(`Thanks for tipping $${amount}!`, 'success');
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">

        {/* Optional feedback message */}
        {message && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
            ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {message.text}
          </div>
        )}

        {/* Optional seeding button */}
        <div className="text-center mb-4">
          <button
            onClick={seedDummyPolls}
            style={{
              background: '#4f46e5',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Seed Full-Range Dummy Polls
          </button>
        </div>

        {/* Show PollList or PollDetail */}
        {!selectedPoll ? (
          <PollList onSelectPoll={setSelectedPoll} />
        ) : (
          <PollDetail
            poll={selectedPoll}
            currentUserId={'user123'} // Replace with real user logic if needed
            onBackToList={() => setSelectedPoll(null)}
            showMessage={showMessage}
            onTipSuccess={handleTipSuccess}
          />
        )}
      </div>
    </FirebaseProvider>
  );
};

export default App;
