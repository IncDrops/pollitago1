import React, { useState, useContext } from 'react';
import PollList from './components/PollList.jsx';
import PollDetail from './components/PollDetail.jsx';
import { FirebaseProvider, FirebaseContext } from './components/FirebaseContext.js';
import './components/PollCard.css';
import SwipeCard from './components/SwipeCard';
import { seedDummyPolls } from './utils/seedDummyPolls'; // ✅ correct path

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

  useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('✅ Signed in:', user.uid);
    } else {
      signInAnonymously(auth)
        .then(() => {
          console.log('✅ Signed in anonymously');
        })
        .catch((error) => {
          console.error('❌ Anonymous sign-in failed:', error);
        });
    }
  });
}, []);

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        
        {/* ✅ Feedback message */}
        {message && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
            ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {message.text}
          </div>
        )}

        {/* ✅ TEMP button to seed dummy polls */}
        <div className="text-center py-4">
          <button
            onClick={seedDummyPolls}
            style={{
              background: '#4f46e5',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              marginBottom: '20px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Seed Full-Range Dummy Polls
          </button>
        </div>

        {/* ✅ Main UI */}
        {!selectedPoll ? (
          <PollList onSelectPoll={setSelectedPoll} />
        ) : (
          <PollDetail
            poll={selectedPoll}
            currentUserId={'user123'} // replace with actual ID if using auth
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
