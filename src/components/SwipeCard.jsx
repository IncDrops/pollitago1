import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './PollCard.css';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../../firebase';


const db = getFirestore();
const auth = getAuth();

export default function SwipeCard({ poll }) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const [voted, setVoted] = useState(false);
  const [voteLabel, setVoteLabel] = useState('');

  const saveVote = async (pollId, optionKey) => {
    const user = auth.currentUser;
    if (!user) return;

    const pollRef = doc(db, 'polls', pollId);
    await updateDoc(pollRef, {
      [`votes.${optionKey}`]: arrayUnion(user.uid),
    });
  };

  const handleVote = async (pollId, selectedOption) => {
    await saveVote(pollId, selectedOption);
    setVoteLabel(`Voted ${selectedOption.toUpperCase()}`);
    setVoted(true);
  };

  const bind = useDrag(
    ({ down, movement: [mx], direction: [dx], velocity }) => {
      if (!down && velocity > 0.2) {
        const votedOption = dx > 0 ? 'optionB' : 'optionA';
        handleVote(poll.id, votedOption);
        api.start({ x: dx > 0 ? 500 : -500 });
        return;
      }
      api.start({ x: down ? mx : 0 });
    },
    { filterTaps: true }
  );

  return (
    <animated.div
      className="poll-card"
      {...bind()}
      style={{
        x,
        touchAction: 'pan-y',
        rotate: x.to((val) => val / 25),
        opacity: voted ? 0.5 : 1,
      }}
    >
      <h2 className="poll-title">{poll.title}</h2>
      <p className="poll-meta">Swipe left = {poll.options[0]}</p>
      <p className="poll-meta">Swipe right = {poll.options[1]}</p>
      {voted && <p className="poll-id">{voteLabel}</p>}
    </animated.div>
  );
}
