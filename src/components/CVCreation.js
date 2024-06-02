import React from 'react';
import CVForm from './CVForm';

const CVCreation = () => {
  const handleCreate = (cvData) => {
    console.log('Creating CV', cvData);
  };

  return (
    <div>
      <h1>Create CV</h1>
      <CVForm onSubmit={handleCreate} />
    </div>
  );
};

export default CVCreation;