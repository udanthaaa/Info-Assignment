import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CVList from './components/CVList';
import CVCreation from './components/CVCreation';
import CVView from './components/CVView';
import CVEdit from './components/CVEdit';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cv" element={<CVList />} />
          <Route path="/cv/create" element={<CVCreation />} />
          <Route path="/cv/view/:id" element={<CVView />} />
          <Route path="/cv/edit/:id" element={<CVEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;