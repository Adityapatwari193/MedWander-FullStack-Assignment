import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const FormPage = () => {
  const { type } = useParams();
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const countryCodes = [
    { code: '1', name: 'USA/Canada' },
    { code: '44', name: 'UK' },
    { code: '91', name: 'India' },
    { code: '61', name: 'Australia' },
    { code: '86', name: 'China' },
    { code: '81', name: 'Japan' },
    { code: '27', name: 'South Africa' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/submit', {
        formType: type,
        name,
        countryCode,
        phoneNumber,
      });

      if (response.status === 200) {
        alert('Form data saved successfully');
        navigate('/'); 
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Form {type}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Country Code:</label>
          <select className="form-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            <option value="">Select Country Code</option>
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} (+{country.code})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input className="form-input" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="form-button" type="submit">Submit</button>
      </form>
      <button className="back-button" onClick={() => navigate('/')}>Go Back to Main Page</button>
    </div>
  );
};

export default FormPage;
