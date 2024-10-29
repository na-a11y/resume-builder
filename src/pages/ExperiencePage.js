import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExperiencePage.css'; 

const ExperiencePage = () => {
  const navigate = useNavigate();
  
  const handleExperienceClick = (experience) => {
    if (experience === 'No Experience') {
      navigate('/student');
    } else {
      navigate('/templates');
    }
  };

  return (
    <div className="experience">
      <h2>How long have you been working?</h2>
      <div className="buttons">
        <button onClick={() => handleExperienceClick('No Experience')}>No Experience</button>
        <button onClick={() => handleExperienceClick('Less Than 3 Years')}>Less Than 3 Years</button>
        <button onClick={() => handleExperienceClick('3-5 Years')}>3-5 Years</button>
        <button onClick={() => handleExperienceClick('5-10 Years')}>5-10 Years</button>
        <button onClick={() => handleExperienceClick('10+ Years')}>10+ Years</button>
      </div>
    </div>
  );
};

export default ExperiencePage;
