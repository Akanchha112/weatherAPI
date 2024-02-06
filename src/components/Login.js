// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/firebase'; // Import the login function

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedIn = await login(email, password);
      if (!loggedIn) {
        // If login fails, navigate to the sign-up page
        nav('/signup');
      } else {
        nav('/homepage'); // Redirect to the homepage after successful login
      }
    } catch (error) {
      setError(error.message); // Handle login error
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '0px', fontSize: '40px' }}>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)', '::placeholder': { color: 'white' } }} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} /><br />

        <button type="submit" style={{ width: '90px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
