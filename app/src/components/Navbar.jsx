import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  const toggleMenu = () => {
    toggleLinks(); // Toggle links visibility
    setIsRotated(!isRotated); // Toggle rotation
  };

  const toggleLinks = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };

  return (
    <div className="topnav">
      <Link to="/" className="active">Logo</Link>
      <div id="myLinks" className={showMenu ? 'show' : ''}>
        <Link to="/Home">Home</Link>
        <Link to="/Calendar">Calendar</Link>
        <Link to="/NewJob">New Job</Link>
        <Link to="/Admin">Admin</Link>
        <Link to="/Login">Login</Link>
      </div>
      <button className={`icon ${isRotated ? 'close' : ''}`} onClick={toggleMenu}>
        {showMenu ? '✕' : '☰'}
      </button>
    </div>
  );
};

export default Navbar;