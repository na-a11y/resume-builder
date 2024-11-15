import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios'; // Import axios for API calls
import './Form.css';

const Preview = ({ formData, onEdit }) => {
  const [resumeId, setResumeId] = useState(null);

  // Function to handle downloading the PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Title of the Resume
    doc.setFontSize(16);
    doc.text('Resume', 105, 20, null, null, 'center');

    doc.setFontSize(12);

    // Personal Details
    doc.text('Personal Details:', 10, 30);
    doc.text(`Name: ${formData.personalInfo.name || 'N/A'}`, 10, 40);
    doc.text(`Email: ${formData.personalInfo.email || 'N/A'}`, 10, 50);
    doc.text(`Phone: ${formData.personalInfo.phone || 'N/A'}`, 10, 60);

    let yOffset = 70;

    // Education Details
    doc.text('Education:', 10, yOffset);
    if (Array.isArray(formData.education) && formData.education.length > 0) {
      formData.education.forEach((edu, index) => {
        yOffset += 10;
        doc.text(`Degree: ${edu.degree || 'N/A'}`, 10, yOffset);
        doc.text(`Institution: ${edu.institution || 'N/A'}`, 10, yOffset + 10);
        doc.text(`Year: ${edu.year || 'N/A'}`, 10, yOffset + 20);
        yOffset += 30;
      });
    } else {
      doc.text('No education details added yet.', 10, yOffset + 10);
    }

    yOffset += 20;

    // Experience Details
    doc.text('Experience:', 10, yOffset);
    if (Array.isArray(formData.experience) && formData.experience.length > 0) {
      formData.experience.forEach((exp, index) => {
        yOffset += 10;
        doc.text(`Title: ${exp.title || 'N/A'}`, 10, yOffset);
        doc.text(`Company: ${exp.company || 'N/A'}`, 10, yOffset + 10);
        doc.text(`Duration: ${exp.duration || 'N/A'}`, 10, yOffset + 20);
        doc.text(`Description: ${exp.description || 'N/A'}`, 10, yOffset + 30);
        yOffset += 40;
      });
    } else {
      doc.text('No experience added yet.', 10, yOffset + 10);
    }

    yOffset += 20;

    // Skills
    doc.text('Skills:', 10, yOffset);
    if (Array.isArray(formData.skills) && formData.skills.length > 0) {
      formData.skills.forEach((skill, index) => {
        yOffset += 10;
        doc.text(`- ${skill}`, 10, yOffset);
      });
    } else {
      doc.text('No skills added yet.', 10, yOffset + 10);
    }

    yOffset += 20;

    // Summary
    doc.text('Summary:', 10, yOffset);
    doc.text(formData.summary || 'No summary provided.', 10, yOffset + 10);

    // Save the PDF
    doc.save('resume.pdf');
  };

  // Function to handle creating a new resume
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resumes', formData);
      setResumeId(response.data._id); // Save the created resume ID for future updates
      console.log('Resume created successfully:', response.data);
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  // Function to handle updating an existing resume
  const handleUpdate = async () => {
    if (!resumeId) {
      console.error('No resume ID found. Create a resume first.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/resumes/${resumeId}`, formData);
      console.log('Resume updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  // Function to handle deleting the resume
  const handleDelete = async () => {
    if (!resumeId) {
      console.error('No resume ID found. Create a resume first.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${resumeId}`);
      setResumeId(null); // Clear the resume ID after deletion
      console.log('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  return (
    <div className="preview-container">
      <h2>Resume Preview</h2>

      {/* Personal Info Section */}
      <section className="personal-details">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {formData.personalInfo.name || 'N/A'}</p>
        <p><strong>Email:</strong> {formData.personalInfo.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {formData.personalInfo.phone || 'N/A'}</p>
      </section>

      {/* Education Section */}
      <section className="education-details">
        <h3>Education</h3>
        {Array.isArray(formData.education) && formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <p><strong>Degree:</strong> {edu.degree || 'N/A'}</p>
              <p><strong>Institution:</strong> {edu.institution || 'N/A'}</p>
              <p><strong>Year:</strong> {edu.year || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No education details added yet.</p>
        )}
      </section>

      {/* Experience Section */}
      <section className="experience-details">
        <h3>Experience</h3>
        {Array.isArray(formData.experience) && formData.experience.length > 0 ? (
          formData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <p><strong>Title:</strong> {exp.title || 'N/A'}</p>
              <p><strong>Company:</strong> {exp.company || 'N/A'}</p>
              <p><strong>Duration:</strong> {exp.duration || 'N/A'}</p>
              <p><strong>Description:</strong> {exp.description || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No experience added yet.</p>
        )}
      </section>

      {/* Skills Section */}
      <section className="skills-details">
        <h3>Skills</h3>
        {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
          <ul>
            {formData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills added yet.</p>
        )}
      </section>

      {/* Summary Section */}
      <section className="summary-details">
        <h3>Summary</h3>
        <p>{formData.summary || 'No summary provided.'}</p>
      </section>

      <div className="preview-buttons">
        <button onClick={handleDownload} className="preview-button">Download Resume</button>
        <button onClick={onEdit} className="preview-button edit-button">Edit</button>
        <button onClick={handleCreate} className="preview-button submit-button">Create Resume</button>
        <button onClick={handleUpdate} className="preview-button submit-button">Update Resume</button>
        <button onClick={handleDelete} className="preview-button delete-button">Delete Resume</button>
      </div>
    </div>
  );
};

export default Preview;
