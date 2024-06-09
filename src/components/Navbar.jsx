import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FaUserCircle } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';

// NavButton component for rendering navigation buttons
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color, backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

// Navbar component for rendering the navigation bar
const Navbar = () => {
  // Accessing state from context provider
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();

  // Effect to handle window resize event
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  // Effect to handle active menu state based on screen size
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  // Function to toggle active menu state
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {/* Navigation button for toggling the menu */}
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      {/* Displaying user profile information */}
      <div className="flex">
        <p>
          <div className="flex items-center text-gray-400 text-14">
            <FaUserCircle size="24" />
            <span className="ml-2">Hi,</span>
            <span className="font-bold ml-1">Welcome Back</span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
