import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Temp2.css';

const Temp2 = () => {
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openingTexts, setOpeningTexts] = useState([]);
  const [letterBody, setLetterBody] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [loadingState, setLoadingState] = useState({
    contacts: true,
    recipients: true,
    subjects: true,
    openingTexts: true,
    letterBody: true,
    conclusion: true,
  });
  const [errorState, setErrorState] = useState({
    contacts: null,
    recipients: null,
    subjects: null,
    openingTexts: null,
    letterBody: null,
    conclusion: null,
    global: null,
  });

  // Fetch all data concurrently
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get('http://localhost:5000/contacts'),
        axios.get('http://localhost:5000/recipient'),
        axios.get('http://localhost:5000/subjects'),
        axios.get('http://localhost:5000/opening-text'),
        axios.get('http://localhost:5000/letters'),
        axios.get('http://localhost:5000/conclusion'),
      ]);

      setContacts(responses[0].data);
      setRecipients(responses[1].data);
      setSubjects(responses[2].data);
      setOpeningTexts(responses[3].data);
      setLetterBody(responses[4].data[0].letterBodyText);
      setConclusion(responses[5].data[0].conclusion);

      setLoadingState({
        contacts: false,
        recipients: false,
        subjects: false,
        openingTexts: false,
        letterBody: false,
        conclusion: false,
      });
    } catch (error) {
      setErrorState({
        ...errorState,
        global: error.message || 'Error fetching all data',
      });
      setLoadingState({
        contacts: false,
        recipients: false,
        subjects: false,
        openingTexts: false,
        letterBody: false,
        conclusion: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSection = (loading, error, data, emptyMessage, renderContent) => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (data.length === 0) return <p>{emptyMessage}</p>;
    return renderContent();
  };

  return (
    <div className="cover-letter-container-temp2">
      <div className="coverlettermain-container-flex-temp2">
        {/* Merged contact and other sections */}
        <div className="contact-details-temp2">
          {renderSection(
            loadingState.contacts,
            errorState.contacts,
            contacts,
            'No contacts available',
            () => (
              <div>
                {contacts.length > 0 && (
                  <div>
                    <h1 style={{ border:"1px solid green",padding:"10px 240px", background:"blue"}}>{contacts[0].firstName} {contacts[0].lastName}</h1>
                    <div>
                      <strong>Phone:</strong> {contacts[0].phone} <br />
                      <strong>Email:</strong> {contacts[0].email} <br />
                      <strong>Address:</strong> {contacts[0].city}, {contacts[0].state}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Render other sections like subjects, recipients, letter body */}
        <div className="other-sections-temp2">
          <div className="subjects-section-temp2">
            {renderSection(
              loadingState.subjects,
              errorState.subjects,
              subjects,
              'No subjects available',
              () => (
                <ul>
                  {subjects.map((subject) => (
                    <li key={subject._id || subject.subjectName}>
                      <p style={{textAlign:"justify"}}><strong>Subject:</strong> {subject.subjectName}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="recipients-section-temp2">
            {renderSection(
              loadingState.recipients,
              errorState.recipients,
              recipients,
              'No recipients available',
              () => (
                <ul>
                  {recipients.map((recipient) => (
                    <li key={recipient._id || recipient.firstName}>
                      <p  style={{textAlign:"justify"}}><strong>Dear:</strong> {recipient.firstName} {recipient.lastName}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="opening-texts-section-temp2">
            {renderSection(
              loadingState.openingTexts,
              errorState.openingTexts,
              openingTexts,
              'No opening texts available',
              () => (
                <ul>
                  {openingTexts.map((text) => (
                    <li key={text._id || text.openingText}>
                      {text.openingText}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="letter-body-section-temp2">
            {loadingState.letterBody ? (
              <div className="loading">Loading...</div>
            ) : errorState.letterBody ? (
              <div className="error">{errorState.letterBody}</div>
            ) : (
              <p style={{textAlign:"justify",padding:"0 16px"}}>{letterBody}</p>
            )}
          </div>

          <div className="conclusion-section-temp2">
            {loadingState.conclusion ? (
              <div className="loading">Loading...</div>
            ) : errorState.conclusion ? (
              <div className="error">{errorState.conclusion}</div>
            ) : (
              <p style={{textAlign:"justify",padding:"0 16px"}}>{conclusion}</p>
            )}
          </div>

          <div className="sincerely-section-temp2">
            <h3 style={{marginLeft:"90px"}}>Sincerely,</h3>
            {contacts.length > 0 && (
              <p  style={{textAlign:"justify",marginLeft:"90px"}}>{contacts[0].firstName} {contacts[0].lastName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp2;