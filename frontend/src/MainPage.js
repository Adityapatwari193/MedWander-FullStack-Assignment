import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css'; 
import Header from './HeaderComponent';
import Footer from './Footer';

const MainPage = () => {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getdata');
      console.log('Response:', response);
      console.log('Response Data:', response.data);
      
      if (response.status === 200) {
        if (response.data.message === "Excel file created and opened successfully") {
          alert(response.data.message);
        } else {
          console.log('Unexpected response data:', response.data);
        }
      } else if (response.status === 500) {
        alert('Failed to refresh data. Please close the Excel file and try again.');
      } 
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleFormA = () => {
    navigate('/form/A');
  };

  const handleFormB = () => {
    navigate('/form/B');
  };

  return (
    <div>
    <Header/>
    <div className="main-container">
      <h1 className="page-title">Welcome to the MedWander</h1>
      <div className="button-container">
        <button className="form-button" onClick={handleFormA}>Form A</button>
        <button className="form-button" onClick={handleFormB}>Form B</button>
        <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default MainPage;
