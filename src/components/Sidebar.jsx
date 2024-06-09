import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel, MdWork } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { FaUserPlus } from 'react-icons/fa';

import { useStateContext } from '../contexts/ContextProvider';

// Sidebar component for rendering the sidebar navigation
const Sidebar = () => {
  // Accessing state from context provider
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  // Function to handle closing the sidebar on small screens
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // CSS classes for active and normal links
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  // Sidebar links data
  const links = [
    {
      title: 'Main',
      links: [
        {
          name: 'Dashboard',
          icon: <AiOutlineDashboard />,
        },
      ],
    },
    {
      title: 'Pages',
      links: [
        {
          name: 'create-CV',
          icon: <FaUserPlus />,
        },
        {
          name: 'stored-CVs',
          icon: <IoMdContacts />,
        },
        {
          name: 'manage-CVs',
          icon: <RiContactsLine />,
        },
      ],
    },
  ];

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* Sidebar header */}
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <MdWork /> <span>JobJourney</span>
            </Link>
            {/* Close button for mobile view */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* Sidebar links */}
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                {/* Section title */}
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {/* Render links */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {/* Icon and text */}
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
