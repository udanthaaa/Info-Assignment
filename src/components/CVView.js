import React from 'react';
import { useParams } from 'react-router-dom';

const CVView = () => {
  const { id } = useParams();
  const cv = { id, name: 'John Doe', email: 'john@example.com', phone: '1234567890', experience: '5 years' };

  return (
    <div>
      <h1>View CV</h1>
      <p>Name: {cv.name}</p>
      <p>Email: {cv.email}</p>
      <p>Phone: {cv.phone}</p>
      <p>Experience: {cv.experience}</p>
    </div>
  );
};

export default CVView;