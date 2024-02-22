import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    toggleLinks(); // Toggle links visibility
  };

  const toggleLinks = () => {
    const links = document.getElementById("myLinks");
    if (links.style.display === "block") {
      links.style.display = "none";
    } else {
      links.style.display = "block";
    }
  };

  return (
    <div className="topnav">
      <Link to="/" className="active">Logo</Link>
      <div id="myLinks" className={showMenu ? 'show' : ''}>
        <Link to="/Home" onClick={toggleMenu}>Home</Link>
        <Link to="/Calendar" onClick={toggleMenu}>Calendar</Link>
        <Link to="/NewJob" onClick={toggleMenu}>New Job</Link>
        <Link to="/Admin" onClick={toggleMenu}>Admin</Link>
        <Link to="/Login" onClick={toggleMenu}>Login</Link>
      </div>
      <button className={`icon ${showMenu ? 'close' : ''}`} onClick={toggleMenu}>
        {showMenu ? '✕' : '☰'} {/* Toggle between X and hamburger icon */}
      </button>
    </div>
  );
};

export default Navbar;