import React, { useState } from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import SummaryForm from './SummaryForm';
import Preview from './Preview';
import './Form.css';

const ResumeBuilder = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {},
    education: [],
    experience: [], // Initialize as an empty array
    skills: [],
    summary: "",
  });
  
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const updateFormData = (section, data) => {
    setFormData({
      ...formData,
      [section]: data,
    });
  };

  return (
    <div className="resume-builder">
      {step === 0 && <PersonalDetailsForm onNext={handleNext} updateData={(data) => updateFormData('personalDetails', data)} />}
      {step === 1 && <EducationForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('education', data)} />}
      {step === 2 && <ExperienceForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('experience', data)} />}
      {step === 3 && <SkillsForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('skills', data)} />}
      {step === 4 && <SummaryForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('summary', data)} />}
      {step === 5 && <Preview formData={formData} onBack={handleBack} />}
    </div>
  );
};

export default ResumeBuilder;
