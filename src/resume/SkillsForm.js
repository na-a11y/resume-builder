// SkillsForm.js
import React, { useState } from 'react';
import './Form.css';

const SkillsForm = ({ onNext, onBack, updateData }) => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');

  const handleAddSkill = () => {
    if (input) {
      const newSkills = [...skills, input];
      setSkills(newSkills);
      updateData(newSkills);
      setInput('');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    setSkills([]);
  };

  return (
    <div className="form-container">
      <h2>Your Skills</h2>
      <input type="text" value={input} onChange={handleChange} placeholder="Add a skill" />
      <button onClick={handleAddSkill}>Add Skill</button>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <div className="form-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default SkillsForm;
