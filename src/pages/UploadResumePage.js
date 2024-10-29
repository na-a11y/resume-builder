// UploadResumePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadResumePage.css';

const UploadResumePage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleBackClick = () => {
    navigate('/select-resume');
  };

  const handleNextClick = () => {
    if (file) {
      uploadFile(); // Start upload and navigate after success
    } else {
      alert("Please upload a file before proceeding.");
    }
  };

  const uploadFile = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulated upload endpoint - replace with your actual endpoint
      const response = await fetch('https://your-backend-server.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        navigate('/resume-editing'); // Navigate to ResumeEditingPage on success
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("An error occurred during file upload", error);
    } finally {
      setUploading(false);
    }
  };

  const openGoogleDrive = () => {
    window.open('https://drive.google.com', '_blank');
  };

  const openDropbox = () => {
    window.open('https://www.dropbox.com', '_blank');
  };

  return (
    <div className="upload-resume-page">
      <h2>How do you want to upload your resume?</h2>

      <div className="upload-container">
        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {file ? <p>File Selected: {file.name}</p> : <p>Drag and drop a file here</p>}
          <button
            className="browse-button"
            onClick={() => document.getElementById('file-input').click()}
          >
            Browse
          </button>
          <input
            id="file-input"
            type="file"
            accept=".doc,.docx,.pdf,.html,.rtf,.txt"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="upload-options">
          <button onClick={openGoogleDrive}>Google Drive</button>
          <button onClick={openDropbox}>Dropbox</button>
        </div>
      </div>

      <p>Files we can read: DOC, DOCX, PDF, HTML, RTF, TXT</p>

      <div className="action-buttons">
        <button className="back-button" onClick={handleBackClick}>Back</button>
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default UploadResumePage;
