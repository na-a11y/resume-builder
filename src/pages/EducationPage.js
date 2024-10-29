import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EducationPage.css'; 

const EducationPage = () => {
  const navigate = useNavigate();

  const handleEducationClick = () => {
    navigate('/templates');
  };

  return (
    <div className="education">
      <h2>Select your education level</h2>
      <div className="buttons">
        <button onClick={handleEducationClick}>High School or GED</button>
        <button onClick={handleEducationClick}>Associates</button>
        <button onClick={handleEducationClick}>Bachelors</button>
        <button onClick={handleEducationClick}>Masters or Higher</button>
        <button onClick={handleEducationClick}>Some College</button>
        <button onClick={handleEducationClick}>Vocational</button>
      </div>
    </div>
  );
};

export default EducationPage;
