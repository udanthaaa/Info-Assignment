import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

// Button component to handle button clicks and state changes
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  // Access the state context to update state
  const { setIsClicked, initialState } = useStateContext();

  return (
    // Button element with specified styles and onClick event handler
    <button
      type="button"
      onClick={() => setIsClicked(initialState)} // Set state to initial state when button is clicked
      style={{ backgroundColor: bgColor, color, borderRadius }} // Apply custom styles to the button
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`} // Apply tailwind classes dynamically
    >
      {icon} {text} {/* Display button icon and text */}
    </button>
  );
};

export default Button; // Export the Button component
