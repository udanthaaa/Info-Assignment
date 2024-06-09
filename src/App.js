import React, { useEffect } from 'react'; // Importing necessary React components and hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importing Router components for navigation
import { FiSettings } from 'react-icons/fi'; // Importing settings icon from react-icons
import { TooltipComponent } from '@syncfusion/ej2-react-popups'; // Importing TooltipComponent for displaying tooltips

import { Navbar, Footer, Sidebar, ThemeSettings } from './components'; // Importing custom components
import { Dashboard, CVCreation, CVEdit, CVStored, CVManage, CVView } from './pages'; // Importing page components
import './App.css'; // Importing CSS styles

import { useStateContext } from './contexts/ContextProvider'; // Importing context for state management

const App = () => {
  // Destructuring necessary state and functions from context
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  // useEffect hook to set theme color and mode from local storage on component mount
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode'); // Get stored theme color
    const currentThemeMode = localStorage.getItem('themeMode'); // Get stored theme mode
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor); // Set current color from local storage
      setCurrentMode(currentThemeMode); // Set current mode from local storage
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}> {/* Conditional class based on current theme mode */}
      <BrowserRouter> {/* Router component to handle routing */}
        <div className="flex relative dark:bg-main-dark-bg"> {/* Main container with conditional background */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}> {/* Settings button container */}
            <TooltipComponent
              content="Settings" // Tooltip content
              position="Top" // Tooltip position
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)} // Open theme settings on click
                style={{ background: currentColor, borderRadius: '50%' }} // Button styling
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray" // Button classes
              >
                <FiSettings /> {/* Settings icon */}
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? ( // Conditional rendering of the sidebar
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white "> {/* Sidebar with fixed width */}
              <Sidebar /> {/* Sidebar component */}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg"> {/* Hidden sidebar */}
              <Sidebar /> {/* Sidebar component */}
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  ' // Main content with sidebar
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 ' // Main content without sidebar
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full "> {/* Navbar container */}
              <Navbar /> {/* Navbar component */}
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)} {/* Conditional rendering of ThemeSettings component */}

              <Routes>
                {/* Define routes for the application */}
                <Route path="/" element={(<Dashboard />)} /> {/* Dashboard route */}
                <Route path="/dashboard" element={(<Dashboard />)} /> {/* Dashboard route */}

                {/* Pages routes */}
                <Route path="/stored-cvs" element={<CVStored />} /> {/* Stored CVs route */}
                <Route path="/manage-cvs" element={<CVManage />} /> {/* Manage CVs route */}
                <Route path="/create-cv" element={<CVCreation />} /> {/* Create CV route */}
                <Route path="/cv-view/:id" element={<CVView />} /> {/* View CV route with ID parameter */}
                <Route path="/cv-edit/:id" element={<CVEdit />} /> {/* Edit CV route with ID parameter */}
              </Routes>
            </div>
            <Footer /> {/* Footer component */}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App; // Exporting App component as default
