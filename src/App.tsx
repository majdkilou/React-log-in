import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Table from './components/Table';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLoginSuccess={() => {}} />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
};

export default App;
