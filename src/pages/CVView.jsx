import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { useParams } from 'react-router-dom'; // Importing useParams for accessing URL parameters
import { Header } from '../components'; // Importing Header component
import { FaUserCircle } from 'react-icons/fa'; // Importing UserCircle icon from react-icons/fa

const CVView = () => {
  const { id } = useParams(); // Getting the id parameter from URL
  const [cv, setCv] = useState(null); // State to store CV data

  useEffect(() => {
    // Effect hook to fetch and set CV data based on the id from localStorage
    const storedData = JSON.parse(localStorage.getItem('cvData')) || []; // Retrieving stored CV data from localStorage
    const cvDataWithId = storedData.map((cv, index) => ({ ...cv, id: index })); // Adding id property to each CV object
    setCv(cvDataWithId.find(cv => cv.id === parseInt(id))); // Finding the CV with the matching id and setting it to state
  }, [id]); // Triggering effect when id changes

  // If no CV found with the provided id, display a message
  if (!cv) {
    return <p>CV not found.</p>;
  }

  // Rendering the CV details
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      {/* Header component */}
      <Header category="Page" title="CV Details" />
      <div className="p-10 bg-gray-100 rounded-lg">
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* UserCircle icon */}
          <div className="flex-shrink-0">
            <FaUserCircle size="150" />
          </div>
          <div className="mt-4 md:mt-0">
            {/* Name and Phone Number */}
            <h2 className="text-2xl font-bold">{cv.firstName} {cv.lastName}</h2>
            <p className="text-sm text-gray-600">{cv.phoneNumber}</p>
          </div>
        </div>
        <div className="mt-8">
          {/* Details section */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* Displaying various details */}
            <div><strong>Age:</strong> {cv.age}</div>
            <div><strong>Address:</strong> {cv.address}</div>
            <div><strong>Date of Birth:</strong> {cv.dateOfBirth}</div>
            <div><strong>Is Active:</strong> {cv.isActive ? 'Yes' : 'No'}</div>
            <div><strong>Nationality:</strong> {cv.nationality}</div>
            <div><strong>Employment Status:</strong> {cv.employmentStatus}</div>
            <div><strong>Preferred Languages:</strong> {cv.preferredLanguages.join(', ')}</div>
          </div>
        </div>
        <div className="mt-8">
          {/* Work Experience section */}
          <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2">Work Experience</h3>
          {/* Mapping through work experiences */}
          {cv.workExperience.map((exp, index) => (
            <div key={index} className="mt-4">
              {/* Displaying work experience details */}
              <h4 className="font-bold">{exp.place}</h4>
              <p className="text-sm text-gray-600">{exp.address}</p>
              <p className="text-sm text-gray-600">{exp.experience} </p>
              <p className="text-sm text-gray-600">{exp.periodType}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVView; // Exporting the CVView component as default
