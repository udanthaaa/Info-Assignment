import React, { useState } from 'react'; // Importing React and hooks
import CVForm from './CVForm'; // Importing the CVForm component
import { Header } from '../components'; // Importing the Header component
import { useStateContext } from '../contexts/ContextProvider'; // Importing context for state management

const CVCreation = () => {
  // Destructuring currentColor from context
  const { currentColor } = useStateContext(); 

  // Setting initial state for form data
  const [initialData, setInitialData] = useState({ 
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: null,
    isActive: false,
    nationality: '',
    employmentStatus: '',
    preferredLanguages: [],
    workExperience: [{ place: '', address: '', experience: '', periodType: '' }]
  });

  // State to track form errors
  const [errors, setErrors] = useState({}); 

  // State to show success message
  const [successMessage, setSuccessMessage] = useState(''); 

  // Function to handle form submission
  const handleSubmit = (cvData) => {
    console.log('Creating CV', cvData);
    const phoneNumberWithCountryCode = `${cvData.countryCode} ${cvData.phoneNumber}`; // Formatting phone number
    const formattedData = {
      ...cvData,
      phoneNumber: phoneNumberWithCountryCode,
      dateOfBirth: formatDate(cvData.dateOfBirth) // Formatting date of birth
    };
    const existingData = JSON.parse(localStorage.getItem('cvData')) || []; // Retrieving existing CV data from localStorage
    existingData.push(formattedData); // Adding new CV data
    localStorage.setItem('cvData', JSON.stringify(existingData)); // Saving updated CV data to localStorage
    setSuccessMessage('CV submitted successfully!'); // Setting success message
    setTimeout(() => setSuccessMessage(''), 3000); // Clearing success message after 3 seconds
    clearForm(); // Clearing form data
  };

  // Function to validate the form data
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
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    if (validateForm(formData)) {
      handleSubmit(formData);
    }
  };

  // Function to clear the form data
  const clearForm = () => {
    setInitialData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: null,
      isActive: false,
      nationality: '',
      employmentStatus: '',
      preferredLanguages: [],
      workExperience: [{ place: '', address: '', experience: '', periodType: '' }]
    });
  };

  // Function to format the date to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
  
    return [year, month, day].join('-');
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}> {/* Container for the CV creation page */}
      <Header category="Page" title="Create CV" /> {/* Header component */}
      <CVForm
        initialData={initialData}
        onSubmit={handleFormSubmit}
        errors={errors}
        successMessage={successMessage}
        setInitialData={setInitialData}
        currentColor={currentColor}
      /> {/* CVForm component with props */}
    </div>
  );
};

export default CVCreation; // Exporting the CVCreation component as default
