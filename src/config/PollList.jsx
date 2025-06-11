// src/components/PollList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import '../firebase';

const PollList = ({ onSelectPoll }) => {
  const [polls, setPolls] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'polls'));
        const pollData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPolls(pollData);
      } catch (err) {
        console.error('Error fetching polls:', err);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      {polls.map((poll) => (
        <div
          key={poll.id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectPoll(poll)}
        >
          <h2 className="text-lg font-semibold mb-2">{poll.title}</h2>
          <ul className="space-y-1">
            {poll.options?.map((option, index) => (
              <li key={index} className="text-sm text-gray-700">• {option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PollList;
