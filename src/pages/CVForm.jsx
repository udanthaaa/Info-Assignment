import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/CVForm.css';
import { useStateContext } from '../contexts/ContextProvider';

const CVForm = ({ onSubmit, initialData }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [nationality, setNationality] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [preferredLanguages, setPreferredLanguages] = useState([]);
    const [workExperience, setWorkExperience] = useState([{ place: '', address: '', experience: '', periodType: '' }]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const { currentColor } = useStateContext();
  
    useEffect(() => {
      if (initialData) {
        setFirstName(initialData.firstName || '');
        setLastName(initialData.lastName || '');
        setAge(initialData.age || '');
        setAddress(initialData.address || '');
        setPhoneNumber(initialData.phoneNumber || '');
        setDateOfBirth(initialData.dateOfBirth || null);
        setIsActive(initialData.isActive || false);
        setNationality(initialData.nationality || '');
        setEmploymentStatus(initialData.employmentStatus || '');
        setTermsAccepted(initialData.termsAccepted || false);
        setPreferredLanguages(initialData.preferredLanguages || []);
        setWorkExperience(initialData.workExperience || [{ place: '', address: '', experience: '', periodType: '' }]);
      }
    }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const formattedData = {
            firstName,
            lastName,
            age: parseInt(age, 10),
            address,
            phoneNumber,
            dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '',
            isActive,
            nationality,
            employmentStatus,
            preferredLanguages,
            workExperience
          };

      const existingData = JSON.parse(localStorage.getItem('cvData')) || [];
      existingData.push(formattedData);
      localStorage.setItem('cvData', JSON.stringify(existingData));

      onSubmit(formattedData);
      setSuccessMessage('CV submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      clearForm();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!age || age < 0) newErrors.age = 'Age is required and cannot be lower than 0';
    if (!address) newErrors.address = 'Address is required';
    if (!phoneNumber || !/^\+?\d+$/.test(phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (!preferredLanguages.length) newErrors.preferredLanguages = 'Preferred languages are required';
    if (workExperience.some(exp => !exp.place || !exp.address || !exp.experience || !exp.periodType)) {
      newErrors.workExperience = 'All work experience fields are required';
    }

    if (dateOfBirth) {
      const birthYear = dateOfBirth.getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      if (age !== calculatedAge.toString()) {
        newErrors.age = 'Age does not match the date of birth';
      }
    } else {
      newErrors.age = 'Date of birth is required to calculate age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setAddress('');
    setPhoneNumber('');
    setDateOfBirth(null);
    setIsActive(false);
    setNationality('');
    setEmploymentStatus('');
    setTermsAccepted(false);
    setPreferredLanguages([]);
    setWorkExperience([{ place: '', address: '', experience: '', periodType: '' }]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { place: '', address: '', experience: '', periodType: '' }]);
  };

  const removeWorkExperience = (index) => {
    if (workExperience.length === 1) {
      // Prevent deleting the last work experience
      return;
    }
    const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedWorkExperience);
  };

  const nationalityOptions = [
    { value: 'srilankan', label: 'Sri Lankan' },
    { value: 'american', label: 'American' },
    { value: 'canadian', label: 'Canadian' },
    { value: 'british', label: 'British' },
  ];

  const employmentStatusOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
  ];

  const languageOptions = [
    { value: 'sinhala', label: 'Sinhala' },
    { value: 'english', label: 'English' },
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Date of Birth: </label>
          <DatePicker selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
        </div>
        <div>
          <label>Is Active: </label>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </div>
        <div>
          <label>Nationality:</label>
          <Select options={nationalityOptions} value={nationalityOptions.find(option => option.value === nationality)} onChange={(option) => setNationality(option.label)} />
        </div>
        <div>
          <label>Employment Status:</label>
          <Select options={employmentStatusOptions} value={employmentStatusOptions.find(option => option.value === employmentStatus)} onChange={(option) => setEmploymentStatus(option.label)} />
        </div>
        <div>
          <label>Preferred Languages:</label>
          <Select isMulti options={languageOptions} value={languageOptions.filter(option => preferredLanguages.includes(option.value))} onChange={(options) => setPreferredLanguages(options.map(option => option.label))} />
          {errors.preferredLanguages && <span className="error">{errors.preferredLanguages}</span>}
        </div>
        <div>
          <label>Work Experience:</label>
          {workExperience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Place"
                value={exp.place}
                onChange={(e) => handleWorkExperienceChange(index, 'place', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Address"
                value={exp.address}
                onChange={(e) => handleWorkExperienceChange(index, 'address', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Number of experience"
                value={exp.experience}
                onChange={(e) => handleWorkExperienceChange(index, 'experience', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Period type"
                value={exp.periodType}
                onChange={(e) => handleWorkExperienceChange(index, 'periodType', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              {workExperience.length > 1 && (
                <div className="flex space-x-2 mt-2">
                    <button type="button" onClick={() => removeWorkExperience(index)} className="px-4 py-2 bg-red-500 text-white rounded"> Remove </button>
                </div>
                )}
              <div className="mb-2"></div>
              {index === workExperience.length - 1 && (
                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={addWorkExperience}
                    className="px-4 py-2 bg-green-500 text-white rounded">
                    Add Work Experience
                  </button>
                </div>
              )}
              {errors.workExperience && <span className="error">{errors.workExperience}</span>}
            </div>
          ))}
        </div>
        <div>
          <label>Terms and Conditions: </label>
          <input type="checkbox" checked={termsAccepted} onChange={((e) => setTermsAccepted(e.target.checked))} />
          {errors.termsAccepted && <span className="error">{errors.termsAccepted}</span>}
        </div>
        <button type="submit" style={{ backgroundColor: termsAccepted ? currentColor : 'lightgray' }} className="hover:drop-shadow-xl"  disabled={!termsAccepted}>Submit</button>
      </form>
      {successMessage && <div className="success-popup">{successMessage}</div>}
    </div>
  );
};

export default CVForm;

