import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/CVList.css';

const CVList = () => {
  const [cvData, setCvData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    setCvData(storedData);
  }, []);

  const renderActiveStatus = (isActive) => {
    return (
      <span className={`status-chip ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  return (
    <div>
      <h2>Stored CVs</h2>
      {cvData.length === 0 ? (
        <p>No CVs stored yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cvData.map((cv, index) => (
              <tr key={index}>
                <td>{cv.firstName} {cv.lastName}</td>
                <td>{cv.age}</td>
                <td>{renderActiveStatus(cv.isActive)}</td>
                <td>
                  <Link to={`/cv-view/${index}`}>View</Link> | <Link to={`/cv-edit/${index}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CVList;
