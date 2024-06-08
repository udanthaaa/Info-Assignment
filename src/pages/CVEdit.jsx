import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import CVForm from './CVForm';

const CVEdit = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    const cvDataWithId = storedData.map((cv, index) => ({ ...cv, id: index }));
    setCv(cvDataWithId.find(cv => cv.id === parseInt(id)));
  }, [id]);

  const handleEdit = (editedData) => {
    const storedData = JSON.parse(localStorage.getItem('cvData')) || [];
    const updatedData = storedData.map((cv, index) => {
      if (index === parseInt(id)) {
        return { ...editedData, id: index };
      }
      return cv;
    });
    localStorage.setItem('cvData', JSON.stringify(updatedData));
    setCv(editedData);
  };

  if (!cv) {
    return <p>CV not found.</p>;
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Edit CV" />
      <CVForm onSubmit={handleEdit} initialData={cv} />
    </div>
  );
};

export default CVEdit;
