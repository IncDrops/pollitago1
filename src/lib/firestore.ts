import { getFirestore } from 'firebase/firestore';
import { app } from './firebase'; // Adjust the path if necessary

// Get the Firestore instance
const db = getFirestore(app);

export { db };