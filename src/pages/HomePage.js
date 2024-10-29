import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="home">
      <h1>Build Your Resume</h1>
      <button className="btn" onClick={() => navigate('/experience')}>Build a Resume</button>
    </div>
  );
};

export default HomePage;
