import React, { useState, useContext } from 'react';
import PollList from './components/PollList.jsx';
import PollDetail from './components/PollDetail.jsx';
import { FirebaseProvider, FirebaseContext } from './components/FirebaseContext.js';


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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {message && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
            ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {message.text}
          </div>
        )}

        {!selectedPoll ? (
          <PollList onSelectPoll={setSelectedPoll} />
        ) : (
          <PollDetail poll={selectedPoll} currentUserId={userId} // Replace with actual user ID from context if needed
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
