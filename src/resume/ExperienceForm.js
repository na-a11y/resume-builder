// ExperienceForm.js
import React, { useState } from 'react';
import './Form.css';

const ExperienceForm = ({ onNext, onBack, updateData }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      updateData(updatedData); // Call updateData with updated form data
      return updatedData;
    });
  };
  

  const handleClear = () => {
    setFormData({
      companyName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    });
  };

  return (
    <div className="form-container">
      <h2>Work Experience</h2>
      <div className="form-grid">
        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
        <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
        <input type="text" name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} />
        <input type="text" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} />
        <textarea name="responsibilities" placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} />
      </div>
      <div className="form-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default ExperienceForm;
