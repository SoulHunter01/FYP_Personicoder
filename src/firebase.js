import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCOpso6JsnxheVT225vPXaNCn31SLKyddA",
  authDomain: "personicoder.firebaseapp.com",
  projectId: "personicoder",
  storageBucket: "personicoder.appspot.com",
  messagingSenderId: "840775144919",
  appId: "1:840775144919:web:20adb6449a68513c746792"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db, app }