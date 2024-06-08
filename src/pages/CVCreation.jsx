import React from 'react';
import CVForm from './CVForm';
import { Header } from '../components';

const CVCreation = () => {
  const handleCreate = (cvData) => {
    console.log('Creating CV', cvData);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)' }}>
      <Header category="Page" title="Create CV" />
      <CVForm onSubmit={handleCreate} />
    </div>
  );
};

export default CVCreation;
