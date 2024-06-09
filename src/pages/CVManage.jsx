import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids'; // Importing Syncfusion grid components
import { Link } from 'react-router-dom'; // Importing Link for routing
import { Header } from '../components'; // Importing Header component
import { FaUserCircle } from 'react-icons/fa'; // Importing UserCircle icon from react-icons/fa library

const CVManage = () => {
  // State to store CV data
  const [cvData, setCvData] = useState([]);

  // Function to add unique IDs to CV data
  const addUniqueId = (cvData) => {
    return cvData.map((cv, index) => ({ ...cv, id: index }));
  };

  // Effect hook to load CV data from localStorage on component mount
  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cvDataWithId = addUniqueId(storedCvData);
    setCvData(cvDataWithId);
  }, []);

  // Function to render the status chip based on isActive property
  const renderActiveStatus = (isActive) => {
    return (
      <span className={`status-chip ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Function to render links for viewing and editing CVs
  const renderLink = (data) => {
    return (
      <>
        <Link to={`/cv-view/${data.id}`} className="text-blue-500 hover:underline mr-2">View</Link>
        <Link to={`/cv-edit/${data.id}`} className="text-blue-500 hover:underline">Edit</Link>
      </>
    );
  };

  // Function to render user profile icon
  const renderProfileIcon = () => {
    return <FaUserCircle size={24} />;
  };

  // Function to render full name from first name and last name
  const renderFullName = (data) => {
    return `${data.firstName} ${data.lastName}`;
  };

  // Grid columns configuration
  const gridColumns = [
    { headerText: '', width: '20', textAlign: 'Center', template: renderProfileIcon }, // Icon column
    { field: 'fullName', headerText: 'Full Name', width: '200', textAlign: 'Center', template: renderFullName }, // Full Name column
    { field: 'age', headerText: 'Age', width: '100', textAlign: 'Center' }, // Age column
    { field: 'isActive', headerText: 'Status', width: '100', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) }, // Status column
    { field: 'actions', headerText: 'Actions', width: '200', textAlign: 'Center', template: renderLink }, // Actions column
  ];

  // Toolbar options
  const toolbarOptions = ['Search'];

  // Edit settings for the grid
  const editing = { allowDeleting: false, allowEditing: false };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      {/* Header component */}
      <Header category="Page" title="Manage CVs" />

      {/* Syncfusion Grid Component */}
      <GridComponent
        dataSource={cvData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* Mapping grid columns */}
          {gridColumns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
      </GridComponent>

      {/* Styling for status chip */}
      <style jsx>{`
        .status-chip {
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
        }
        .status-chip.active {
          background-color: green;
        }
        .status-chip.inactive {
          background-color: red;
        }
      `}</style>
    </div>
  );
};

export default CVManage; // Exporting the CVManage component as default
