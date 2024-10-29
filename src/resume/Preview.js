import React from 'react';
import './Form.css';

const Preview = ({ formData }) => {
  return (
    <div className="preview">
      <h2>Resume Preview</h2>

      {/* Personal Details */}
      <section>
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

      {/* Education */}
      <section>
        <h3>Education</h3>
        {Array.isArray(formData.education) && formData.education.length > 0 ? (
          <ul>
            {formData.education.map((edu, index) => (
              <li key={index}>
                <p><strong>School Name:</strong> {edu.schoolName}</p>
                <p><strong>Location:</strong> {edu.location}</p>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Start Year:</strong> {edu.startYear}</p>
                <p><strong>End Year:</strong> {edu.endYear}</p>
                <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
                <p><strong>Description:</strong> {edu.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No education details added yet.</p>
        )}
      </section>

      {/* Experience */}
      <section>
        <h3>Experience</h3>
        {Array.isArray(formData.experience) && formData.experience.length > 0 ? (
          <ul>
            {formData.experience.map((exp, index) => (
              <li key={index}>
                <p><strong>Job Title:</strong> {exp.jobTitle}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Start Year:</strong> {exp.startYear}</p>
                <p><strong>End Year:</strong> {exp.endYear}</p>
                <p><strong>Description:</strong> {exp.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No experience added yet.</p>
        )}
      </section>

      {/* Skills */}
      <section>
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

      {/* Summary */}
      <section>
        <h3>Summary</h3>
        <p>{formData.summary || 'No summary provided.'}</p>
      </section>
    </div>
  );
};

export default Preview;
