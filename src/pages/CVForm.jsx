import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Styles/CVForm.css';
import Switch from 'react-switch';

const CVForm = ({
  initialData,
  onSubmit,
  errors,
  successMessage,
  setInitialData,
  currentColor
}) => {
  const handleChange = (field, value) => {
    setInitialData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...initialData.workExperience];
    updatedWorkExperience[index][field] = value;
    handleChange('workExperience', updatedWorkExperience);
  };

  const addWorkExperience = () => {
    handleChange('workExperience', [...initialData.workExperience, { place: '', address: '', experience: '', periodType: '' }]);
  };

  const removeWorkExperience = (index) => {
    if (initialData.workExperience.length === 1) {
      return;
    }
    const updatedWorkExperience = initialData.workExperience.filter((_, i) => i !== index);
    handleChange('workExperience', updatedWorkExperience);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(initialData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={initialData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={initialData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={initialData.age} onChange={(e) => handleChange('age', e.target.value)} />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={initialData.address} onChange={(e) => handleChange('address', e.target.value)} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={initialData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Date of Birth: </label>
          <DatePicker selected={initialData.dateOfBirth} onChange={(date) => handleChange('dateOfBirth', date)} />
        </div>
        <div className="flex items-center space-x-2">
          <label>Is Active: </label>
          <Switch
            onChange={(checked) => handleChange('isActive', checked)}
            checked={initialData.isActive}
            height={20}
            width={40}
            onColor="#00D084"
            offColor="#888"
          />
        </div>
        <div>
          <label>Nationality:</label>
          <Select options={nationalityOptions} value={nationalityOptions.find(option => option.value === initialData.nationality)} onChange={(option) => handleChange('nationality', option.value)} />
          {errors.nationality && <span className="error">{errors.nationality}</span>}
        </div>
        <div>
          <label>Employment Status:</label>
          <Select options={employmentStatusOptions} value={employmentStatusOptions.find(option => option.value === initialData.employmentStatus)} onChange={(option) => handleChange('employmentStatus', option.value)} />
          {errors.employmentStatus && <span className="error">{errors.employmentStatus}</span>}
        </div>
        <div>
          <label>Preferred Languages:</label>
          <Select isMulti options={languageOptions} value={languageOptions.filter(option => initialData.preferredLanguages.includes(option.value))} onChange={(options) => handleChange('preferredLanguages', options.map(option => option.value))} />
          {errors.preferredLanguages && <span className="error">{errors.preferredLanguages}</span>}
        </div>
        <div>
          <label>Work Experience:</label>
          {initialData.workExperience.map((exp, index) => (
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
              {initialData.workExperience.length > 1 && (
                <div className="flex space-x-2 mt-2">
                  <button type="button" onClick={() => removeWorkExperience(index)} className="px-4 py-2 bg-red-500 text-white rounded"> Remove </button>
                </div>
              )}
              <div className="mb-2"></div>
              {index === initialData.workExperience.length - 1 && (
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
          <input type="checkbox" checked={initialData.termsAccepted} onChange={((e) => handleChange('termsAccepted', e.target.checked))} />
          {errors.termsAccepted && <span className="error">{errors.termsAccepted}</span>}
        </div>
        <button type="submit" style={{ backgroundColor: initialData.termsAccepted ? currentColor : 'lightgray' }} className="hover:drop-shadow-xl"  disabled={!initialData.termsAccepted}>Submit</button>
      </form>
      {successMessage && <div className="success-popup">{successMessage}</div>}
    </div>
  );
};

export default CVForm;
