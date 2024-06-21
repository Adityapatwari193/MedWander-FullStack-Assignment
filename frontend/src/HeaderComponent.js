import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="image.jpeg" alt="Logo" className="header-logo" />
        <h1 className="header-title">MedWander</h1>
      </div>
    </header>
  );
};

export default Header;
