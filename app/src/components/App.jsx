import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './Home.jsx';
import Calendar from './Calendar.jsx';
import Admin from './Admin.jsx';
import NewJob from './NewJob.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx'; // Import Navbar component
import CreateUser from './CreateUser.jsx'
import EditEmployee from './EditEmployee.jsx'

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
          <Route path ="/Admin/Create" element={<CreateUser />} />
          <Route path ="/EditEmployee3" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;