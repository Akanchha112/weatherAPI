import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../services/firebase';

function Session() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>User Session</h2>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}

export default Session;
