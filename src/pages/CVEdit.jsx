import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { useParams } from 'react-router-dom'; // Hook to access URL parameters
import { Header } from '../components'; // Importing Header component
import CVForm from './CVForm'; // Importing CVForm component
import { useStateContext } from '../contexts/ContextProvider'; // Importing context for state management

const CVEdit = () => {
  const { id } = useParams(); // Extracting the 'id' parameter from the URL
  const [cv, setCv] = useState(null); // State to hold the CV data to be edited
  const [errors, setErrors] = useState({}); // State to track form validation errors
  const [successMessage, setSuccessMessage] = useState(''); // State to show success message after form submission
  const { currentColor } = useStateContext(); // Destructuring currentColor from context

  useEffect(() => {
    // Fetching CV data from localStorage
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    // Adding IDs to each CV for identification
    const cvDataWithId = storedData.map((cv, index) => ({ ...cv, id: index }));
    // Finding the CV to edit based on the URL parameter 'id'
    const cvToEdit = cvDataWithId.find(cv => cv.id === parseInt(id));
    if (cvToEdit) {
      // Separate country code and phone number
      const [countryCode, phoneNumber] = cvToEdit.phoneNumber.split(' ');
      cvToEdit.phoneNumber = phoneNumber;
      cvToEdit.countryCode = countryCode;
      // Converting date string to Date object
      cvToEdit.dateOfBirth = new Date(cvToEdit.dateOfBirth);
    }
    setCv(cvToEdit); // Setting the found CV data to state
  }, [id]); // Dependency array ensures the effect runs when 'id' changes

  // Function to handle editing the CV
  const handleEdit = (editedData) => {
    if (validateForm(editedData)) { // Validate form data before proceeding
      editedData.phoneNumber = `${editedData.countryCode} ${editedData.phoneNumber}`; // Format phone number
      const storedData = JSON.parse(localStorage.getItem('cvData')) || []; // Fetch existing CV data from localStorage
      // Update the edited CV in the stored data
      const updatedData = storedData.map((cv, index) => {
        if (index === parseInt(id)) {
          return { ...editedData, id: index, dateOfBirth: formatDate(editedData.dateOfBirth) };
        }
        return cv;
      });
      localStorage.setItem('cvData', JSON.stringify(updatedData)); // Save updated data back to localStorage
      setSuccessMessage('CV edited successfully!'); // Show success message
      setTimeout(() => {
        setSuccessMessage(''); // Clear success message after a short duration
        window.location.href = '/manage-cvs'; // Redirect to manage CVs page
      }, 3000); // Set timeout for 3 seconds
      setCv(editedData); // Update state with edited CV data
    }
  };

  // Show message if CV is not found
  if (!cv) {
    return <p>CV not found.</p>;
  }

  // Function to validate form data
  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.age || formData.age < 0) newErrors.age = 'Age is required and cannot be lower than 0';
    if (!formData.address) newErrors.address = 'Address is required';
  
    const phoneNumberRegex = /^[0-9]{9,10}$/;
    if (!formData.phoneNumber || !phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number. It should contain 9 to 10 digits.';
    }
    
    if (!formData.nationality.length) newErrors.nationality = 'Nationality is required';
    if (!formData.employmentStatus.length) newErrors.employmentStatus = 'Employment Status is required';
    if (!formData.preferredLanguages.length) newErrors.preferredLanguages = 'Preferred languages are required';
    if (formData.workExperience.some(exp => !exp.place || !exp.address || !exp.experience || !exp.periodType)) {
      newErrors.workExperience = 'All work experience fields are required';
    }
  
    if (formData.dateOfBirth) {
      const birthYear = formData.dateOfBirth.getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      if (formData.age !== calculatedAge.toString()) {
        newErrors.age = 'Age does not match the date of birth';
      }
    } else {
      newErrors.age = 'Date of birth is required to calculate age';
    }
  
    setErrors(newErrors); // Set form validation errors
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  
  // Function to format date to yyyy-mm-dd
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
  
    return [year, month, day].join('-'); // Return formatted date string
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}> {/* Container for the CV edit page */}
      <Header category="Page" title="Edit CV" /> {/* Header component */}
      <CVForm
        initialData={cv} // Initial data for the form
        onSubmit={handleEdit} // Submit handler for the form
        errors={errors} // Validation errors
        successMessage={successMessage} // Success message after submission
        setInitialData={setCv} // Function to set initial form data
        currentColor={currentColor} // Current theme color from context
      />
      {successMessage && <div className="success-popup">{successMessage}</div>} {/* Success message popup */}
    </div>
  );
};

export default CVEdit; // Exporting the CVEdit component as default
