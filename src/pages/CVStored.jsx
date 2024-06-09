import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort, Search, Resize } from '@syncfusion/ej2-react-grids'; // Importing Syncfusion grid components
import { Header } from '../components'; // Importing Header component

const CVStored = () => {
  // State to store CV data
  const [cvData, setCvData] = useState([]);

  // Effect hook to load CV data from localStorage on component mount
  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || []; // Retrieving stored CV data from localStorage
    setCvData(storedCvData); // Setting CV data state
  }, []);

  // Function to render the status chip based on isActive property
  const renderActiveStatus = (isActive) => {
    return (
      <span className={`status-chip ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Configuration for grid columns
  const gridColumns = [
    { field: 'firstName', headerText: 'First Name', minWidth: '100', textAlign: 'Center', autoFit: true }, // First Name column
    { field: 'lastName', headerText: 'Last Name', minWidth: '100', textAlign: 'Center', autoFit: true }, // Last Name column
    { field: 'age', headerText: 'Age', minWidth: '100', textAlign: 'Center', autoFit: true }, // Age column
    { field: 'address', headerText: 'Address', minWidth: '150', textAlign: 'Center', autoFit: true }, // Address column
    { field: 'phoneNumber', headerText: 'Phone No', minWidth: '120', textAlign: 'Center', autoFit: true }, // Phone Number column
    { field: 'dateOfBirth', headerText: 'Date of Birth', minWidth: '120', textAlign: 'Center', autoFit: true }, // Date of Birth column
    { field: 'isActive', headerText: 'Active', minWidth: '80', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) }, // Active column
    { field: 'nationality', headerText: 'Nationality', minWidth: '120', textAlign: 'Center', autoFit: true }, // Nationality column
    { field: 'employmentStatus', headerText: 'Employee Status', minWidth: '120', textAlign: 'Center', autoFit: true }, // Employment Status column
    { field: 'preferredLanguages', headerText: 'Preferred Languages', minWidth: '200', textAlign: 'Center', autoFit: true } // Preferred Languages column
  ];

  const toolbarOptions = ['Search']; // Options for grid toolbar

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      {/* Header component */}
      <Header category="Page" title="Stored CVs" />

      {/* Syncfusion Grid Component */}
      <GridComponent
        dataSource={cvData} // Data source for the grid
        allowPaging // Paging enabled
        toolbar={toolbarOptions} // Toolbar options
        pageSettings={{ pageCount: 5 }} // Page settings
        allowSorting // Sorting enabled
        width="100%" // Grid width
        allowResizing // Column resizing enabled
      >
        <ColumnsDirective>
          {/* Mapping grid columns */}
          {gridColumns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        {/* Injecting required services */}
        <Inject services={[Page, Sort, Search, Resize]} />
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

export default CVStored; // Exporting the CVStored component as default
