import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { FaUserCircle } from 'react-icons/fa';

const CVManage = () => {
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

  const addUniqueId = (cvData) => {
    return cvData.map((cv, index) => ({ ...cv, id: index }));
  };
  
  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cvDataWithId = addUniqueId(storedCvData);
    setCvData(cvDataWithId);
  }, []);
  

  const renderLink = (data) => {
    return (
      <>
        <Link to={`/cv-view/${data.id}`} className="text-blue-500 hover:underline mr-2">View</Link>
        <Link to={`/cv-edit/${data.id}`} className="text-blue-500 hover:underline">Edit</Link>
      </>
    );
  };

  const renderProfileIcon = () => {
    return <FaUserCircle size={24} />;
  };

  const renderFullName = (data) => {
    return `${data.firstName} ${data.lastName}`;
  };

  const gridColumns = [
    { headerText: '', width: '20', textAlign: 'Center', template: renderProfileIcon },
    { field: 'fullName', headerText: 'Full Name', width: '200', textAlign: 'Center', template: renderFullName },
    { field: 'age', headerText: 'Age', width: '100', textAlign: 'Center' },
    { field: 'isActive', headerText: 'Status', width: '100', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) },
    { field: 'actions', headerText: 'Actions', width: '200', textAlign: 'Center', template: renderLink },
  ];
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: false, allowEditing: false };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Manage CVs" />
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
          {gridColumns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
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

export default CVManage;
