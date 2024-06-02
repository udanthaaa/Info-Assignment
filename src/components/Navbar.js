import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/cv-form">Create CV</Link></li>
      <li><Link to="/cv-list">View CVs</Link></li>
    </ul>
  </nav>
);

export default Navbar;