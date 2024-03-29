import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Calendar from './Calendar.jsx';
import Admin from './Admin.jsx'
import NewJob from './NewJob.jsx'
import Login from './Login.jsx'
import Navbar from './Navbar.jsx' 
import CreateUser from './CreateUser.jsx'
import EditEmployee from './EditEmployee.jsx'
import UserTimeSheet from './UserTimeSheet.jsx';
import './Navbar.css'
import ViewSingleJob from './ViewSingleJob.jsx';
import AdminJoblist from './AdminJoblist.jsx';
import EditJob from './EditJob.jsx';
import TimeSheet from './TimeSheet.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in (for example, by checking localStorage or session storage)
    const userIsLoggedIn = localStorage.getItem('token') !== null;

    setIsLoggedIn(userIsLoggedIn);
  }, [])

  const handleLogin = (loginData) => {
    setIsLoggedIn(true);
    setIsAdmin(loginData.isAdmin); // Assuming loginData contains isAdmin information
  }

  const handleLogout = () => {
    // Perform logout actions, such as removing the token from localStorage
    localStorage.removeItem('token');
    
    // Update state to reflect that the user is no longer logged in
    setIsLoggedIn(false);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Render login page if user is not authenticated */}
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {/* Render protected routes if user is authenticated */}
          {isLoggedIn && (
             <>
             <Route path="/" element={<Navigate to="/calendar" />} />
             <Route path="/TimeSheet" element={<TimeSheet />} />
             <Route path="/calendar" element={<Calendar jwtToken={localStorage.getItem('token')} />} />
             <Route path="/jobs/:id" element={<ViewSingleJob />} />
             <Route path="/newjob" element={<NewJob />} />
             {/* {isAdmin && <Route path="/Admin" element={<Admin />} />} */}
             <Route path="/admin" element={<Admin />} />
             {/* the above is breaking the admin route when {} and isAdmin removed it workes */}
             <Route path ="/Admin/Create" element={<CreateUser />} />
             <Route path ="/Edit/:id" element={<EditEmployee />} />
             <Route path ="/timesheet/:id" element={<UserTimeSheet />} />
             <Route path ="/Admin/Jobs" element={<AdminJoblist />} />
             <Route path ="/EditJobs/:id" element={<EditJob />} />


           </>
          )}
        </Routes>
        {/* Render Navbar if user is logged in */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
      </BrowserRouter>
    </>
  )
}

export default App