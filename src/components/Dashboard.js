import React from 'react';

const Dashboard = () => {
  localStorage.removeItem('cvData');

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard!</p>
    </div>
  );
};

export default Dashboard;