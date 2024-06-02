import React from 'react';
import { Link } from 'react-router-dom';

const CVList = () => {
  const cvs = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  return (
    <div>
      <h1>CV List</h1>
      <Link to="/cv/create">Create New CV</Link>
      <ul>
        {cvs.map(cv => (
          <li key={cv.id}>
            <Link to={`/cv/view/${cv.id}`}>{cv.name}</Link>
            <Link to={`/cv/edit/${cv.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVList;