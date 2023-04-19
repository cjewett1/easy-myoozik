// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Our database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EASY_PUBLIC_API_KEY,
    authDomain: process.env.EASY_PUBLIC_AUTH_DOMAIN,
    databaseURL: "https://easy-myoozik-default-rtdb.firebaseio.com",
    projectId: process.env.EASY_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EASY_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EASY_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EASY_PUBLIC_APP_ID,
    measurementId: "G-TKC4TJMHW1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
