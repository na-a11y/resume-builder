import React from 'react';
import jsPDF from 'jspdf';
import axios from 'axios'; // Import axios for API calls
import './Form.css';

const Preview = ({ formData, onEdit }) => {
  const handleDownload = async () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Title of the Resume
    doc.setFontSize(16);
    doc.text('Resume', 105, 20, null, null, 'center');

    doc.setFontSize(12);

    // Personal Details
    doc.text('Personal Details:', 10, 30);
    doc.text(`First Name: ${formData.personalDetails.firstName || 'N/A'}`, 10, 40);
    doc.text(`Last Name: ${formData.personalDetails.lastName || 'N/A'}`, 10, 50);
    doc.text(`Profession: ${formData.personalDetails.profession || 'N/A'}`, 10, 60);
    doc.text(`City: ${formData.personalDetails.city || 'N/A'}`, 10, 70);
    doc.text(`State: ${formData.personalDetails.state || 'N/A'}`, 10, 80);
    doc.text(`Country: ${formData.personalDetails.country || 'N/A'}`, 10, 90);
    doc.text(`Zip Code: ${formData.personalDetails.zipCode || 'N/A'}`, 10, 100);
    doc.text(`Phone: ${formData.personalDetails.phone || 'N/A'}`, 10, 110);
    doc.text(`Email: ${formData.personalDetails.email || 'N/A'}`, 10, 120);

    let yOffset = 130;

    // Education Details
    doc.text('Education:', 10, yOffset);
    if (Array.isArray(formData.education) && formData.education.length > 0) {
      formData.education.forEach((edu, index) => {
        yOffset += 10;
        doc.text(`School Name: ${edu.schoolName}`, 10, yOffset);
        doc.text(`Location: ${edu.location}`, 10, yOffset + 10);
        doc.text(`Degree: ${edu.degree}`, 10, yOffset + 20);
        doc.text(`Start Year: ${edu.startYear}`, 10, yOffset + 30);
        doc.text(`End Year: ${edu.endYear}`, 10, yOffset + 40);
        doc.text(`Field of Study: ${edu.fieldOfStudy}`, 10, yOffset + 50);
        doc.text(`Description: ${edu.description}`, 10, yOffset + 60);
        yOffset += 70;
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
        doc.text(`Job Title: ${exp.jobTitle}`, 10, yOffset);
        doc.text(`Company: ${exp.company}`, 10, yOffset + 10);
        doc.text(`Start Year: ${exp.startYear}`, 10, yOffset + 20);
        doc.text(`End Year: ${exp.endYear}`, 10, yOffset + 30);
        doc.text(`Description: ${exp.description}`, 10, yOffset + 40);
        yOffset += 50;
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

    // Send formData to backend
    try {
      await axios.post('http://localhost:3000/api/resumes', formData);
      console.log("Resume data saved successfully.");
    } catch (error) {
      console.error("Error saving resume data:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="preview-container">
      <h2>Resume Preview</h2>

      <section className="personal-details">
        <h3>Personal Details</h3>
        <p><strong>First Name:</strong> {formData.personalDetails.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> {formData.personalDetails.lastName || 'N/A'}</p>
        <p><strong>Profession:</strong> {formData.personalDetails.profession || 'N/A'}</p>
        <p><strong>City:</strong> {formData.personalDetails.city || 'N/A'}</p>
        <p><strong>State:</strong> {formData.personalDetails.state || 'N/A'}</p>
        <p><strong>Country:</strong> {formData.personalDetails.country || 'N/A'}</p>
        <p><strong>Zip Code:</strong> {formData.personalDetails.zipCode || 'N/A'}</p>
        <p><strong>Phone:</strong> {formData.personalDetails.phone || 'N/A'}</p>
        <p><strong>Email:</strong> {formData.personalDetails.email || 'N/A'}</p>
      </section>

      <section className="education-details">
        <h3>Education</h3>
        {Array.isArray(formData.education) && formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <p><strong>School Name:</strong> {edu.schoolName}</p>
              <p><strong>Location:</strong> {edu.location}</p>
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Start Year:</strong> {edu.startYear}</p>
              <p><strong>End Year:</strong> {edu.endYear}</p>
              <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
              <p><strong>Description:</strong> {edu.description}</p>
            </div>
          ))
        ) : (
          <p>No education details added yet.</p>
        )}
      </section>

      <section className="experience-details">
        <h3>Experience</h3>
        {Array.isArray(formData.experience) && formData.experience.length > 0 ? (
          formData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <p><strong>Job Title:</strong> {exp.jobTitle}</p>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Start Year:</strong> {exp.startYear}</p>
              <p><strong>End Year:</strong> {exp.endYear}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </div>
          ))
        ) : (
          <p>No experience added yet.</p>
        )}
      </section>

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

      <section className="summary-details">
        <h3>Summary</h3>
        <p>{formData.summary || 'No summary provided.'}</p>
      </section>

      <div className="preview-buttons">
        <button onClick={handleDownload} className="preview-button">Download Resume</button>
        <button onClick={onEdit} className="preview-button edit-button">Edit</button>
      </div>
    </div>
  );
};

export default Preview;
