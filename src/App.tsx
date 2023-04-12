import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLoginSuccess={() => {}} />} />
      </Routes>
    </Router>
  );
};

export default App;
