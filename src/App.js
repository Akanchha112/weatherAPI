// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext'; // Import the AuthProvider
import { auth, login, signup, logout } from './services/firebase'; // Import Firebase auth functions
import UserTable from './components/UserTable';
import Homepage from './components/Homepage';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Import the SignUp component
import './styles/App.css';

function App() {
  return (
    <AuthProvider auth={auth} login={login} signup={signup} logout={logout}>
      <BrowserRouter>
        <div>
          <div className='background'></div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> {/* Route to SignUp component */}
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/users" element={<UserTable />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
