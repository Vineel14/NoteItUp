// src/MainApp.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import App from './App'; // Import the main App component
import EditorPage from './components/EditorPage'; // Import EditorPage

const MainApp = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the AuthPage (login/register) */}
        <Route path="/" element={<AuthPage />} />

        {/* Route for the main app (homepage) */}
        <Route path="/home" element={<App />} />

        {/* Route for the editor */}
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
