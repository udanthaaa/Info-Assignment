import React, { createContext, useContext, useState } from 'react';

// Create a context to hold the application state
const StateContext = createContext();

// Define the initial state of the application
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// ContextProvider component to manage state and provide it to the application
export const ContextProvider = ({ children }) => {
  // State variables for various aspects of the application
  const [screenSize, setScreenSize] = useState(undefined); // State for screen size
  const [currentColor, setCurrentColor] = useState('#03C9D7'); // State for current color
  const [currentMode, setCurrentMode] = useState('Light'); // State for current mode (Light/Dark)
  const [themeSettings, setThemeSettings] = useState(false); // State for theme settings
  const [activeMenu, setActiveMenu] = useState(true); // State for active menu item
  const [isClicked, setIsClicked] = useState(initialState); // State for clicked items

  // Function to set the mode (Light/Dark)
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value); // Save the mode to local storage
  };

  // Function to set the color theme
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color); // Save the color to local storage
  };

  // Function to handle click events on various items
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // Provide the state values and functions to the components within the application
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state context
export const useStateContext = () => useContext(StateContext);
