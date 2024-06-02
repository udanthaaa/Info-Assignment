import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CVView = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    setCv(storedData[id]);
  }, [id]);

  if (!cv) {
    return <p>CV not found.</p>;
  }

  return (
    <div>
      <h2>CV Details</h2>
      <p><strong>First Name:</strong> {cv.firstName}</p>
      <p><strong>Last Name:</strong> {cv.lastName}</p>
      <p><strong>Age:</strong> {cv.age}</p>
      <p><strong>Address:</strong> {cv.address}</p>
      <p><strong>Phone Number:</strong> {cv.phoneNo}</p>
      <p><strong>Date of Birth:</strong> {cv.dob}</p>
      <p><strong>Is Active:</strong> {cv.isActive ? 'Yes' : 'No'}</p>
      <p><strong>Nationality:</strong> {cv.Nationality}</p>
      <p><strong>Employment Status:</strong> {cv.employeeStatus}</p>
      <p><strong>Preferred Languages:</strong> {cv.preferedLanguages.join(', ')}</p>
      <h3>Work Experience</h3>
      <ul>
        {cv.workExpirenece.map((exp, index) => (
          <li key={index}>
            <p><strong>Place:</strong> {exp.workingPlaceName}</p>
            <p><strong>Address:</strong> {exp.workingPlaceAddress}</p>
            <p><strong>Experience:</strong> {exp.numberOfExpirence} {exp.typeOfPeriod}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVView;