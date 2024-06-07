import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CVForm from './components/CVForm';
import CVList from './components/CVList';
import CVEdit from './components/CVEdit';
import CVView from './components/CVView';
import CVCreation from './components/CVCreation';

const App = () => {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv-creation" element={<CVCreation />} />
          <Route path="/cv-form" element={<CVForm />} />
          <Route path="/cv-list" element={<CVList />} />
          <Route path="/cv-view/:id" element={<CVView />} />
          <Route path="/cv-edit/:id" element={<CVEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
