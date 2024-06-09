import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import CVForm from './CVForm';
import { useStateContext } from '../contexts/ContextProvider';

const CVEdit = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { currentColor } = useStateContext();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cvDataWithId = storedData.map((cv, index) => ({ ...cv, id: index }));
    const cvToEdit = cvDataWithId.find(cv => cv.id === parseInt(id));
    if (cvToEdit) {
      cvToEdit.dateOfBirth = new Date(cvToEdit.dateOfBirth); // Convert string to Date object
    }
    setCv(cvToEdit);
  }, [id]);

  const handleEdit = (editedData) => {
    if (validateForm(editedData)) {
      const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
      const updatedData = storedData.map((cv, index) => {
        if (index === parseInt(id)) {
          return { ...editedData, id: index };
        }
        return cv;
      });
      localStorage.setItem('cvData', JSON.stringify(updatedData));
      setSuccessMessage('CV edited successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setCv(editedData);
    }
  };

  if (!cv) {
    return <p>CV not found.</p>;
  }

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.age || formData.age < 0) newErrors.age = 'Age is required and cannot be lower than 0';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phoneNumber || !/^\+?\d+$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Edit CV" />
      <CVForm
        initialData={cv}
        onSubmit={handleEdit}
        errors={errors}
        successMessage={successMessage}
        setInitialData={setCv}
        currentColor={currentColor}
      />
      {successMessage && <div className="success-popup">{successMessage}</div>}
    </div>
  );
};

export default CVEdit;
