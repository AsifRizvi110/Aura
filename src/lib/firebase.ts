import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Paste your own values from Firebase Console:
// Project settings (gear icon) > Your apps > Web app > firebaseConfig
// These values are not secret. Your data is protected by the Firestore rules.
const firebaseConfig = {
  apiKey: "AIzaSyDx5BRcgevbs3FUpTBLv70GmMThtRsk8Jg",
  authDomain: "aura-global-blog.firebaseapp.com",
  projectId: "aura-global-blog",
  storageBucket: "aura-global-blog.firebasestorage.app",
  messagingSenderId: "955074618764",
  appId: "1:955074618764:web:86c8debfc90bcc95cba2a9",
  measurementId: "G-YC3B2K66CC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);