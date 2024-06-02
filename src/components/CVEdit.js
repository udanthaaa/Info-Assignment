import React from 'react';
import { useParams } from 'react-router-dom';
import CVForm from './CVForm';

const CVEdit = () => {
  const { id } = useParams();
  const cv = { id, name: 'John Doe', email: 'john@example.com', phone: '1234567890', experience: '5 years' };

  const handleEdit = (cvData) => {
    console.log('Editing CV', id, cvData);
  };

  return (
    <div>
      <h1>Edit CV</h1>
      <CVForm onSubmit={handleEdit} initialData={cv} />
    </div>
  );
};

export default CVEdit;