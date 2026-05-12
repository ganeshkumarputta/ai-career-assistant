import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyA5pBP8j7cQ-j0SGqbXwOstZw52-nAFoa8",

  authDomain:
    "ai-resume-analysis-f2c42.firebaseapp.com",

  projectId:
    "ai-resume-analysis-f2c42",

  storageBucket:
    "ai-resume-analysis-f2c42.firebasestorage.app",

  messagingSenderId:
    "280028459109",

  appId:
    "1:280028459109:web:0735e759b6ef5cd1eb568c",

  measurementId:
    "G-E2XSJDTX26"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);