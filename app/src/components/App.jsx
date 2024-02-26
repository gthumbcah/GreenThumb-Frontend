import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import Calendar from './Calendar.jsx';
import Admin from './Admin.jsx';
import NewJob from './NewJob.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in (for example, by checking localStorage or session storage)
    const userIsLoggedIn = localStorage.getItem('token') !== null;

    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogin = (loginData) => {
    setIsLoggedIn(true);
    setIsAdmin(loginData.isAdmin); // Assuming loginData contains isAdmin information
  };

  const handleLogout = () => {
    // Perform logout actions, such as removing the token from localStorage
    localStorage.removeItem('token');
    
    // Update state to reflect that the user is no longer logged in
    setIsLoggedIn(false);
  };

  return (
    <>
      <h1>Green Thumb Landscaping</h1>
      <BrowserRouter>
        <Routes>
          {/* Render login page if user is not authenticated */}
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {/* Render protected routes if user is authenticated */}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Navigate to="/calendar" />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/newjob" element={<NewJob />} />
              {isAdmin && <Route path="/admin" element={<Admin />} />}
            </>
          )}
        </Routes>
        {/* Render Navbar if user is logged in */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
      </BrowserRouter>
    </>
  );
}

export default App;
