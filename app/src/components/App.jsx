import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import Calendar from './Calendar.jsx';
import Admin from './Admin.jsx';
import NewJob from './NewJob.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx'; // Import Navbar component

function App() {
  return (
    <>
      <h1>Green Thumb Landscaping</h1>
      <BrowserRouter>
        <Navbar /> {/* Render Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/NewJob" element={<NewJob />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path ="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;