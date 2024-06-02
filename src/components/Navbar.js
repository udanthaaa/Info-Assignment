import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/cv">CV List</Link></li>
        <li><Link to="/cv/create">Create CV</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;