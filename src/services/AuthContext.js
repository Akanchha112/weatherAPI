

import React, { createContext, useContext, useState ,useEffect} from 'react';
import { auth } from './firebase'; 


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); 

  
  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error; 
    }
  };

  
  const signup = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error; // Handle signup error
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw error; // Handle logout error
    }
  };

  // Effect to set the current user when the authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe; // Cleanup function
  }, []);

  // Provide the authentication context value to the children
  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
