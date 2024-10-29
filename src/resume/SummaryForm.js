// SummaryForm.js
import React, { useState } from 'react';
import './Form.css';

const SummaryForm = ({ onNext, onBack, updateData }) => {
  const [summary, setSummary] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSummary(value);
    updateData(value);
  };

  const handleClear = () => {
    setSummary('');
  };

  return (
    <div className="form-container">
      <h2>Summary</h2>
      <textarea value={summary} onChange={handleChange} placeholder="Provide a summary of your career or goals" />
      <div className="form-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default SummaryForm;
