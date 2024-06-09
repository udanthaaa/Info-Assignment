import React, { useState, useEffect } from 'react';
import CVForm from './CVForm';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const CVCreation = () => {
  const { currentColor } = useStateContext();
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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (cvData) => {
    console.log('Creating CV', cvData);
    const phoneNumberWithCountryCode = `${cvData.countryCode} ${cvData.phoneNumber}`;
    const formattedData = {
      ...cvData,
      phoneNumber: phoneNumberWithCountryCode,
      dateOfBirth: formatDate(cvData.dateOfBirth)
    };
    const existingData = JSON.parse(localStorage.getItem('cvData')) || [];
    existingData.push(formattedData);
    localStorage.setItem('cvData', JSON.stringify(existingData));
    setSuccessMessage('CV submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    clearForm();
  };
  

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
    return Object.keys(newErrors).length === 0;
  };
  

  const handleFormSubmit = (formData) => {
    if (validateForm(formData)) {
      handleSubmit(formData);
    }
  };

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
  }
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Create CV" />
      <CVForm
        initialData={initialData}
        onSubmit={handleFormSubmit}
        errors={errors}
        successMessage={successMessage}
        setInitialData={setInitialData}
        currentColor={currentColor}
      />
    </div>
  );
};

export default CVCreation;
