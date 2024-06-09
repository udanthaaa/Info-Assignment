import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { Button } from '../components'; // Importing Button component
import { useStateContext } from '../contexts/ContextProvider'; // Importing state context
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids'; // Importing necessary components from Syncfusion Grid package
import { RiContactsLine } from 'react-icons/ri'; // Importing icons
import { Header } from '../components'; // Importing Header component
import { MdWork } from 'react-icons/md'; // Importing icons
import { FaUserMinus, FaGraduationCap, FaLanguage } from 'react-icons/fa'; // Importing icons

const Dashboard = () => {
  const { currentColor } = useStateContext(); // Getting current color from state context
  const [cvData, setCvData] = useState([]); // State for storing CV data
  const [totalCVs, setTotalCVs] = useState(0); // State for total number of CVs
  const [activeCVs, setActiveCVs] = useState(0); // State for active CVs count
  const [recentCVs, setRecentCVs] = useState([]); // State for storing recent CV submissions
  const [mostPreferredLanguage, setMostPreferredLanguage] = useState(''); // State for the most preferred language

  // Effect hook to initialize dashboard data
  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || []; // Retrieving stored CV data from localStorage
    setCvData(storedCvData); // Setting CV data to state
    setTotalCVs(storedCvData.length); // Setting total number of CVs
    setActiveCVs(storedCvData.filter(cv => cv.isActive).length); // Setting count of active CVs
    setRecentCVs(storedCvData.slice(-3).reverse()); // Setting recent CV submissions
    setMostPreferredLanguage(findMostPreferredLanguage(storedCvData)); // Setting the most preferred language
  }, []);

  // Function to find the most preferred language among CVs
  const findMostPreferredLanguage = (cvData) => {
    let languageCount = {};
    cvData.forEach(cv => {
      cv.preferredLanguages.forEach(language => {
        languageCount[language] = (languageCount[language] || 0) + 1;
      });
    });
    const mostPreferred = Object.keys(languageCount).reduce((a, b) => languageCount[a] > languageCount[b] ? a : b, '');
    return mostPreferred;
  };

  // Function to render active status chip
  const renderActiveStatus = (isActive) => {
    return (
      <span className={`status-chip ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Function to add unique IDs to CV data
  const addUniqueId = (cvData) => {
    return cvData.map((cv, index) => ({ ...cv, id: index }));
  };
  
  useEffect(() => {
    const storedCvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cvDataWithId = addUniqueId(storedCvData);
    setCvData(cvDataWithId);
  }, []);

  // Function to render full name
  const renderFullName = (data) => {
    return `${data.firstName} ${data.lastName}`;
  };

  // Grid columns configuration
  const gridColumns = [
    { field: 'fullName', headerText: 'Full Name', width: '200', textAlign: 'Center', template: renderFullName },
    { field: 'age', headerText: 'Age', width: '100', textAlign: 'Center' },
    { field: 'isActive', headerText: 'Status', width: '100', textAlign: 'Center', template: (data) => renderActiveStatus(data.isActive) },
  ];

  // Editing settings for grid
  const editing = { allowDeleting: false, allowEditing: false };

  // Dashboard data state
  const [dashData, setDashData] = useState([
    {
      icon: <MdWork />,
      amount: '0',
      title: 'Employed',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <FaUserMinus />,
      amount: '0',
      title: 'Unemployed',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FaGraduationCap />,
      amount: '0',
      title: 'Students',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    },
    {
      icon: <FaLanguage />,
      amount: '0',
      title: 'Most Preferred Language',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ]);

  // Effect hook to update dashboard data based on CV data changes
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || []; // Retrieving stored CV data from localStorage

    const employedCount = storedData.filter(cv => cv.employmentStatus === 'employed').length; // Count of employed CVs
    const unemployedCount = storedData.filter(cv => cv.employmentStatus === 'unemployed').length; // Count of unemployed CVs
    const studentCount = storedData.filter(cv => cv.employmentStatus === 'student').length; // Count of student


    setDashData(prevData => prevData.map(item => {
      if (item.title === 'Employed') {
        return { ...item, amount: employedCount.toString() };
      }
      if (item.title === 'Unemployed') {
        return { ...item, amount: unemployedCount.toString() };
      }
      if (item.title === 'Students') {
        return { ...item, amount: studentCount.toString() };
      }
      if (item.title === 'Most Preferred Language') {
        return { ...item, amount: mostPreferredLanguage };
      }
      return item;
    }));
  }, [mostPreferredLanguage]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
    style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Main" title="Dashboard" />
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex justify-between items-center" >
            <div>
              <p className="font-bold text-gray-400">Total Number of CVs</p>
              <p className="text-2xl">{totalCVs}</p>
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
          {dashData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl " style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:cursor-default"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
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
              <p className="font-semibold text-white text-2xl">Active CVs</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">{activeCVs}</p>
                <p className="text-gray-200">Currently Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex flex-col justify-start items-start gap-2" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
            <div>
              <p className="font-semibold text-xl">Recent CV Submissions</p>
            </div>
            <div className="mt-4">
              <ul>
                {recentCVs.map((cv, index) => (
                  <li key={index} className="mb-2">
                    <p className="text-lg">{`${cv.firstName} ${cv.lastName}`}</p>
                    <p className="text-gray-400">{cv.submissionDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

