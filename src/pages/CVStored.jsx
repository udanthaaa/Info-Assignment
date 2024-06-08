import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort, Search, Resize } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

const CVStored = () => {
  const [cvData, setCvData] = useState([]);

  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || [];
    setCvData(storedCvData);
  }, []);

  const renderActiveStatus = (isActive) => {
    return (
      <span className={`status-chip ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const gridColumns = [
    { field: 'firstName', headerText: 'First Name', minWidth: '100', textAlign: 'Center', autoFit: true },
    { field: 'lastName', headerText: 'Last Name', minWidth: '100', textAlign: 'Center', autoFit: true },
    { field: 'age', headerText: 'Age', minWidth: '100', textAlign: 'Center', autoFit: true },
    { field: 'address', headerText: 'Address', minWidth: '150', textAlign: 'Center', autoFit: true },
    { field: 'phoneNumber', headerText: 'Phone No', minWidth: '120', textAlign: 'Center', autoFit: true },
    { field: 'dateOfBirth', headerText: 'Date of Birth', minWidth: '120', textAlign: 'Center', autoFit: true },
    { field: 'isActive', headerText: 'Active', minWidth: '80', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) },
    { field: 'nationality', headerText: 'Nationality', minWidth: '120', textAlign: 'Center', autoFit: true },
    { field: 'employmentStatus', headerText: 'Employee Status', minWidth: '120', textAlign: 'Center', autoFit: true },
    { field: 'preferredLanguages', headerText: 'Preferred Languages', minWidth: '200', textAlign: 'Center', autoFit: true }
  ];

  const toolbarOptions = ['Search'];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
         style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Stored CVs" />
      <GridComponent
        dataSource={cvData}
        allowPaging
        toolbar={toolbarOptions}
        pageSettings={{ pageCount: 5 }}
        allowSorting
        width="100%"
        allowResizing
      >
        <ColumnsDirective>
          {gridColumns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Sort, Search, Resize]} />
      </GridComponent>
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

export default CVStored;
