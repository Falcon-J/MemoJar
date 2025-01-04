import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrGzv6Qh3KziO0uW4z6SirMd7nIAHPZks",
  authDomain: "memojar-52bba.firebaseapp.com",
  projectId: "memojar-52bba",
  storageBucket: "memojar-52bba.firebasestorage.app",
  messagingSenderId: "334130953858",
  appId: "1:334130953858:web:4f814f231d7c8e4e913e9b",
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
