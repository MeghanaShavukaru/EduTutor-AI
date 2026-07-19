// ✅ Replace these values with your Firebase project config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbN3Wctel7-HZRuqzJ5YOA44vvApJmlco",
  authDomain: "edututorai-dc795.firebaseapp.com",
  projectId: "edututorai-dc795",
  storageBucket: "edututorai-dc795.firebasestorage.app",
  messagingSenderId: "893307974703",
  appId: "1:893307974703:web:aaed7b459f3c73750ac2da",
  measurementId: "G-2XW2QXX3R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
