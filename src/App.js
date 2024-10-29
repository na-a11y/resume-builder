import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import StudentPage from './pages/StudentPage';
import EducationPage from './pages/EducationPage';
import TemplatePage from './pages/TemplatePage';
import SelectResumePage from './pages/SelectResumePage';
import UploadResumePage from './pages/UploadResumePage';
import ResumeBuilder from './resume/ResumeBuilder';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/templates" element={<TemplatePage />} />
          <Route path="/select-resume" element={<SelectResumePage />} />
          <Route path="/upload-resume" element={<UploadResumePage />} />
          <Route path="/resume-editing" element={<ResumeBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
