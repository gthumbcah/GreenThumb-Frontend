import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import Calendar from './Calendar.jsx';
import Admin from './Admin.jsx';
import NewJob from './NewJob.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx'; // Import Navbar component
import './App.css'

function App() {
  const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <>
      <h1>Green Thumb Landscaping</h1>
      <BrowserRouter>
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          {/* Routes for other pages */}
          <Route path="/*" element={<AuthenticatedRoutes isAuthenticated={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// AuthenticatedRoutes component handles routes that require authentication
function AuthenticatedRoutes({ isAuthenticated }) {
  return (
    <>
      {/* Conditional rendering of Navbar based on authentication */}
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/newjob" element={<NewJob />} />
        <Route path="/admin" element={<Admin />} />
        {/* Redirect to login page if not authenticated */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;