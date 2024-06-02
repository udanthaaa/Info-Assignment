import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CVForm from './CVForm';

const CVEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cv = storedData[parseInt(id, 10)];
    if (cv) {
      setInitialData(cv);
    }
  }, [id]);

  const handleFormSubmit = (updatedData) => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    storedData[parseInt(id, 10)] = updatedData;
    localStorage.setItem('cvData', JSON.stringify(storedData));
    navigate('/cv-list');
  };

  return (
    <div>
      <h2>Edit CV</h2>
      {initialData ? (
        <CVForm onSubmit={handleFormSubmit} initialData={initialData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CVEdit;
