// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCy-UW_8BDGDQiuie13PLu5uQLm8HP4kqs",
    authDomain: "buscape-challenges.firebaseapp.com",
    databaseURL: "https://buscape-challenges-default-rtdb.firebaseio.com",
    projectId: "buscape-challenges",
    storageBucket: "buscape-challenges.appspot.com",
    messagingSenderId: "409185220990",
    appId: "1:409185220990:web:0f9188b5b2265ac2d8db2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
