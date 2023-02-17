import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtIRbWyZ3JuVO-aAn5Re8sdgI5fHq2dfQ",
  authDomain: "pos-project-4f60f.firebaseapp.com",
  projectId: "pos-project-4f60f",
  storageBucket: "pos-project-4f60f.appspot.com",
  messagingSenderId: "48152823260",
  appId: "1:48152823260:web:9319a5ed32c6376b55bb19",
  measurementId: "G-HCPGZEB0E9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
