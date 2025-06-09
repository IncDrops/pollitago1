// src/App.jsx

import React, { useState, useContext } from 'react'; // Added useContext back for FirebaseContext
import PollList from './components/PollList.jsx';
// PollDetail is no longer imported as it's not used in this version.
// import PollDetail from './components/PollDetail.jsx'; // Keep commented or remove if not used

import { FirebaseProvider, FirebaseContext } from './components/FirebaseContext.js'; // Ensure FirebaseContext is imported
import './components/PollCard.css'; // Keep this if you have PollCard.css

// IMPORTANT: seedDummyPolls is REMOVED from the frontend App.jsx for security.
// It should be run as a local Node.js script from your terminal (node scripts/seedDummyPolls.js).
// If you had it imported here previously, DELETE that import line:
// import { seedDummyPolls } from './utils/seedDummyPolls';

const App = () => {
  const [message, setMessage] = useState(null);
  // Removed selectedPoll and PollDetail usage as per your provided code.
  // If you need PollDetail functionality, it will need to be re-integrated.

  // Use FirebaseContext to get currentUser for potential future use in PollList or other components.
  const { currentUser } = useContext(FirebaseContext);
  const userId = currentUser ? currentUser.uid : null; // You can pass this down to PollList if needed

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // handleSeedClick is removed as the button is removed for production security.
  // If you re-introduce a dev-only button, use this function.
  // const handleSeedClick = async () => {
  //   console.log("✅ Seed button clicked");
  //   try {
  //     // Ensure seedDummyPolls is imported (e.g., from a dev-only component) if this is re-enabled.
  //     await seedDummyPolls(); 
  //     showMessage("Polls seeded successfully!", "success");
  //   } catch (err) {
  //     console.error("❌ Error seeding polls:", err);
  //     showMessage("Failed to seed polls.", "error");
  //   }
  // };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-white text-gray-900 p-6">
        {message && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50
            ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
            {message.text}
          </div>
        )}

        {/* The Seed Button is REMOVED for production security. */}
        {/* If you need it for LOCAL DEVELOPMENT ONLY, you MUST wrap it in a development check: */}
        {/* {process.env.NODE_ENV === 'development' && ( */}
        {/* <div className="text-center mb-6"> */}
        {/* <button */}
        {/* onClick={handleSeedClick} // This function needs to be defined if button is re-enabled */}
        {/* className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition" */}
        {/* > */}
        {/* Seed Full-Range Dummy Polls */}
        {/* </button> */}
        {/* </div> */}
        {/* )} */}

        <PollList showMessage={showMessage} currentUserId={userId} /> {/* Pass showMessage & userId if PollList needs them */}
      </div>
    </FirebaseProvider>
  );
};

export default App;
