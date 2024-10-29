import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentPage.css'; 

const StudentPage = () => {
  const navigate = useNavigate();

  const handleStudentClick = (isStudent) => {
    if (isStudent === 'Yes') {
      navigate('/education');
    } else {
      navigate('/templates');
    }
  };

  return (
    <div className="student">
      <h2>Are you a student?</h2>
      <div className="buttons">
        <button onClick={() => handleStudentClick('Yes')}>Yes</button>
        <button onClick={() => handleStudentClick('No')}>No</button>
      </div>
    </div>
  );
};

export default StudentPage;
