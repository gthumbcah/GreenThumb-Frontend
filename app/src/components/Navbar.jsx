import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fas fa-bars"></i> {/* Default hamburger icon */}
      </div>
      <ul className={showMenu ? 'menu-active' : 'menu-hidden'}>
        <li><Link to="/Home" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/Calendar" onClick={toggleMenu}>Calendar</Link></li>
        <li><Link to="/NewJob" onClick={toggleMenu}>New Job</Link></li>
        <li><Link to="/Admin" onClick={toggleMenu}>Admin</Link></li>
        <li><Link to="/Login" onClick={toggleMenu}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;