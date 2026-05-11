// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX5g8sPw_iG0HMujrZM8dG7w510c6jpC4",
  authDomain: "campus-hub-2220b.firebaseapp.com",
  projectId: "campus-hub-2220b",
  storageBucket: "campus-hub-2220b.firebasestorage.app",
  messagingSenderId: "371742140259",
  appId: "1:371742140259:web:55a2b29fd269689abb5556"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Shortcuts
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
