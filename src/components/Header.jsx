import React from 'react';

// Header component to display category and title
const Header = ({ category, title }) => (
  <div className="mb-10"> {/* Margin bottom for spacing */}
    <p className="text-lg text-gray-400">{category}</p> {/* Category text */}
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p> {/* Title text */}
  </div>
);

export default Header; // Export the Header component
