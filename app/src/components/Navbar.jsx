import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = ({ onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="topnav">
         <img src={logo} alt="Logo" className="logo" />
      <div className={`menu-icon ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`links ${showMenu ? 'active' : ''}`}>
        <Link to="/Home">Home</Link>
        <Link to="/Calendar">Calendar</Link>
        <Link to="/NewJob">New Job</Link>
        <Link to="/Admin">Admin</Link>
        <Link to="/" onClick={onLogout}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;