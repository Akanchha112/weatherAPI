// SignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/firebase'; // Import the signup function

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password); // Call the signup function
      nav('/homepage'); // Redirect to the homepage after successful signup
    } catch (error) {
      setError(error.message); // Handle signup error
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '0px', fontSize: '40px' }}>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)', '::placeholder': { color: 'white' } }} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} /><br />

        <button type="submit" style={{ width: '90px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
