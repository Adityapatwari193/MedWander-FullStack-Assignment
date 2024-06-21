import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import FormPage from './FormPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/form/:type" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
