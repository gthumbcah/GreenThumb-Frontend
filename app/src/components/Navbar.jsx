import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar"> 
      <ul>
        <li><Link to="/Calendar">Calendar</Link></li>
        <li><Link to="/NewJob">New Job</Link></li>
        <li><Link to="/Admin">Admin</Link></li>
        <li><Link to="/Home">Home</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;