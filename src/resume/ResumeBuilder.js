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
    experience: [],
    skills: [],
    summary: "",
  });

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const updateFormData = (section, data) => {
    setFormData({
      ...formData,
      [section]: data,
    });
  };

  const stepLabels = [
    "Personal Details",
    "Education",
    "Experience",
    "Skills",
    "Summary",
    "Preview",
  ];

  return (
    <div className="resume-builder">
      {/* Only show sidebar for steps 0-4 */}
      {step < 5 && (
        <aside className="sidebar">
          <h2>Resume Builder</h2>
          <ul>
            {stepLabels.slice(0, 5).map((label, index) => (
              <li
                key={index}
                className={index === step ? "active-step" : ""}
                onClick={() => setStep(index)}
              >
                {label}
              </li>
            ))}
          </ul>
        </aside>
      )}
      <div className="form-container">
        {step === 0 && <PersonalDetailsForm onNext={handleNext} updateData={(data) => updateFormData('personalDetails', data)} />}
        {step === 1 && <EducationForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('education', data)} />}
        {step === 2 && <ExperienceForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('experience', data)} />}
        {step === 3 && <SkillsForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('skills', data)} />}
        {step === 4 && <SummaryForm onNext={handleNext} onBack={handleBack} updateData={(data) => updateFormData('summary', data)} />}
        {step === 5 && <Preview formData={formData} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default ResumeBuilder;
