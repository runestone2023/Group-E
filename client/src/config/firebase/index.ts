// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCHKuzWScel9-MQzGM-exq-BpFiMmpd-Gw',
  authDomain: 'restaurant-management-21b75.firebaseapp.com',
  projectId: 'restaurant-management-21b75',
  storageBucket: 'restaurant-management-21b75.appspot.com',
  messagingSenderId: '456533326858',
  appId: '1:456533326858:web:17aca19931b3a63c14b3f3',
  measurementId: 'G-B133K8QNTD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
