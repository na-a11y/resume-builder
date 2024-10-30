// EducationForm.js
import React, { useState } from 'react';
import './Form.css';

const EducationForm = ({ onNext, onBack, updateData }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolLocation: '',
    degree: '',
    startYear: '',
    endYear: '',
    fieldOfStudy: '',
    description: '',
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
      schoolName: '',
      schoolLocation: '',
      degree: '',
      startYear: '',
      endYear: '',
      fieldOfStudy: '',
      description: '',
    });
  };

  return (
    <div className="form-container">
      <h2>Education Details</h2>
      <div className="form-grid">
        <input type="text" name="schoolName" placeholder="School Name" value={formData.schoolName} onChange={handleChange} />
        <input type="text" name="schoolLocation" placeholder="School Location" value={formData.schoolLocation} onChange={handleChange} />
        <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} />
        <input type="text" name="startYear" placeholder="Start Year" value={formData.startYear} onChange={handleChange} />
        <input type="text" name="endYear" placeholder="End Year" value={formData.endYear} onChange={handleChange} />
        <input type="text" name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="form-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default EducationForm;
