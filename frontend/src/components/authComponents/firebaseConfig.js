// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuMXYauPKi4w49dYeCquPdEoc6NDv_xGo",
  authDomain: "interview-platform-e8a74.firebaseapp.com",
  projectId: "interview-platform-e8a74",
  storageBucket: "interview-platform-e8a74.firebasestorage.app",
  messagingSenderId: "679793922925",
  appId: "1:679793922925:web:156aa50b835290529d8064",
  measurementId: "G-LPHVZDG6MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { app };