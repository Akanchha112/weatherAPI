// Import the functions you need from the SDKs you need
// import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, updateDoc, doc,addDoc } from 'firebase/firestore';
import {  onSnapshot, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHk61QrH79X1vfmdP5IZP0-H9DMavretY",
  authDomain: "weatherapi-afee8.firebaseapp.com",
  projectId: "weatherapi-afee8",
  storageBucket: "weatherapi-afee8.appspot.com",
  messagingSenderId: "777728271741",
  appId: "1:777728271741:web:2aebf547ac3e0193625814",
  measurementId: "G-EFWZZ9VTRX"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
// Functions for authentication
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true; // Login successful
  } catch (error) {
    console.error('Error signing in:', error);
    return false; // Login failed
  }
};

const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    try {
        const docRef = await addDoc(collection(db, "users"), {
          Email: email,
          pass: password,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    return true; // Signup successful
  } catch (error) {
    console.error('Error signing up:', error);
    return false; // Signup failed
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return true; // Logout successful
  } catch (error) {
    console.error('Error signing out:', error);
    return false; // Logout failed
  }
};
const fetchUserData = async () => {
    try {
    //   const usersCollection = collection(db, 'Users');
    //   const usersSnapshot = await getDocs(usersCollection);
    //   const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // let data;
        // const q = query(collection(db, 'WeatherApi'))
        // const unsub = onSnapshot(q, (querySnapshot) => {
        //   data=querySnapshot.docs.map(d => ({ id: doc.id, ...doc.data() }));
        //   console.log(data);
        // });

        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = []; // Array to store user data

        querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() }); // Push each document's data into the userData array
        });
        console.log(userData);
      return userData;
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  };
  
  // Function to update user status
  const updateUserStatus = async (userId, newStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
export { auth, login, signup, logout,fetchUserData,updateUserStatus };
// const app = initializeApp(firebaseConfig);