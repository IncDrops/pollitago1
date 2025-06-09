import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const dummyPolls = [
  {
    title: "Engagement location in two weeks: Paris or Italy?",
    options: ["Paris", "Italy"],
    duration: 1036800
  },
  {
    title: "Losing my virginity, condom or no condom?",
    options: ["Use a condom", "Go raw"],
    duration: 604800
  },
  {
    title: "Which house to buy? Option A or Option B?",
    options: ["Option A", "Option B"],
    duration: 2592000
  },
  {
    title: "What to eat for lunch? Tuna sandwich or grilled chicken wrap?",
    options: ["Tuna sandwich", "Grilled chicken wrap"],
    duration: 60
  },
  {
    title: "Dress for the New Orleans Jazz Festival? (Two options)",
    options: ["Floral jumpsuit", "Mesh + fringe combo"],
    duration: 1209600
  },
  {
    title: "Should I quit my job? Yes or No?",
    options: ["Yes", "No"],
    duration: 1036800
  },
  {
    title: "Which career path should I pursue? Tech or Art?",
    options: ["Tech", "Art"],
    duration: 1814400
  },
  {
    title: "Should I break up with my boyfriend? Yes or No?",
    options: ["Yes", "No"],
    duration: 345600
  },
  {
    title: "Should we get back together?",
    options: ["Yes", "Hell no"],
    duration: 1800
  },
  {
    title: "Should I try to reunite with a relative I haven't gotten along with in years?",
    options: ["Reach out", "Let it go"],
    duration: 864000
  },
  {
    title: "My husband cheated, should I stay and try therapy or take this as a sign to run?",
    options: ["Try therapy", "RUN"],
    duration: 28800
  },
  {
    title: "Do these jeans make me look fat, should I workout?",
    options: ["Yes, hit the gym", "Nah, you’re fine"],
    duration: 259200
  }
];

export async function seedDummyPolls() {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be signed in to seed dummy polls.");
    return;
  }

  for (const poll of dummyPolls) {
    await addDoc(collection(db, "polls"), {
      title: poll.title,
      options: poll.options,
      votes: {
        optionA: [],
        optionB: []
      },
      creator: user.uid,
      duration: poll.duration,
      createdAt: serverTimestamp(),
      images: {},
      videoURL: ""
    });
  }

  alert("Dummy polls added!");
}
