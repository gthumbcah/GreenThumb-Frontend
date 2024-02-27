import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="topnav">
      <Link to="/" className="active">Logo</Link>
      <div id="myLinks">
        <Link to="/Home">Home</Link>
        <Link to="/Calendar">Calendar</Link>
        <Link to="/NewJob">New Job</Link>
        <Link to="/Admin">Admin</Link>
        <Link to="/" onClick={onLogout}>Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;