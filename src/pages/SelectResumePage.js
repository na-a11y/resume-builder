// SelectResumePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectResumePage.css';

const SelectResumePage = () => {
  const navigate = useNavigate();

  const handleUploadResumeClick = () => {
    navigate('/upload-resume'); // Navigate to UploadResumePage
  };

  const handleStartFromScratchClick = () => {
    navigate('/resume-editing'); // Navigate to ResumeEditingPage
  };

  const handleBackClick = () => {
    navigate('/templates');
  };

  return (
    <div className="select-resume-page">
      <h2>Are you uploading an existing resume?</h2>
      <p>Just review, edit, and update it with new information</p>

      <div className="options-container">
        <div className="option-card" onClick={handleUploadResumeClick}>
          <div className="recommended-label">Recommended option to save you time</div>
          <div className="icon">&#8593;</div>
          <h3>Yes, upload from my resume</h3>
          <p>We'll give you expert guidance to fill out your info and enhance your resume, from start to finish.</p>
        </div>

        <div className="option-card" onClick={handleStartFromScratchClick}>
          <div className="icon">&#9998;</div>
          <h3>No, start from scratch</h3>
          <p>We'll guide you through the whole process so your skills can shine.</p>
        </div>
      </div>

      <div className="action-buttons">
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default SelectResumePage;
