import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { RiContactsLine } from 'react-icons/ri';
import { Header } from '../components';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
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

  const renderFullName = (data) => {
    return `${data.firstName} ${data.lastName}`;
  };

  const gridColumns = [
    { field: 'fullName', headerText: 'Full Name', width: '200', textAlign: 'Center', template: renderFullName },
    { field: 'age', headerText: 'Age', width: '100', textAlign: 'Center' },
    { field: 'isActive', headerText: 'Status', width: '100', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) },
  ];

  const editing = { allowDeleting: false, allowEditing: false };

  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '39,354',
      percentage: '-4%',
      title: 'Customers',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '4,396',
      percentage: '+23%',
      title: 'Products',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: '423,39',
      percentage: '+38%',
      title: 'Sales',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '39,354',
      percentage: '-12%',
      title: 'Refunds',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
    style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Main" title="Dashboard" />
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex justify-between items-center" >
            <div>
              <p className="font-bold text-gray-400">Total Number of CVs</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <Link to={'/stored-cvs'}>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <RiContactsLine />
            </button>
            </Link>
          </div>
          <div className="mt-6">
          <Link to={'/create-cv'}><Button
              color="white"
              bgColor={currentColor}
              text="Create a new CV"
              borderRadius="10px"
            /></Link>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center" >
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl " style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  " style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex justify-between">
            <p className="font-semibold text-xl">CV Listing</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
          <GridComponent 
            dataSource={cvData}
            enableHover={false}
            allowPaging
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
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor, boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;