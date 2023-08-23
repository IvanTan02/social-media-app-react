// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIRItibYQYx9eQIwar8YTlpM3Rnxwsy6U',
  authDomain: 'react-social-media-app-f19b5.firebaseapp.com',
  projectId: 'react-social-media-app-f19b5',
  storageBucket: 'react-social-media-app-f19b5.appspot.com',
  messagingSenderId: '805896212078',
  appId: '1:805896212078:web:0164b359139f2ef395607f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
