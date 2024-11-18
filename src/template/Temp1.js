import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Temp1.css';

const Temp1 = () => {
  const [contacts, setContacts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openingTexts, setOpeningTexts] = useState([]);
  const [letterBody, setLetterBody] = useState([]); 
  const [conclusion, setConclusion] = useState([]);
  
  const [loadingState, setLoadingState] = useState({
    contacts: true,
    recipients: true,
    subjects: true,
    openingTexts: true,
    letterBody: true,
    conclusion: true
  });
  const [errorState, setErrorState] = useState({
    contacts: null,
    recipients: null,
    subjects: null,
    openingTexts: null,
    letterBody: null,
    conclusion: null,
   
  });


  const fetchData = async (url, setter, loadingKey, errorKey) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
      setLoadingState((prev) => ({ ...prev, [loadingKey]: false }));
    } catch (error) {
      setErrorState((prev) => ({ ...prev, [errorKey]: 'Error fetching data' }));
      setLoadingState((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5000/contacts', setContacts, 'contacts', 'contacts');
    fetchData('http://localhost:5000/recipient', setRecipients, 'recipients', 'recipients');
    fetchData('http://localhost:5000/subjects', setSubjects, 'subjects', 'subjects');
    fetchData('http://localhost:5000/opening-text', setOpeningTexts, 'openingTexts', 'openingTexts');
    fetchData('http://localhost:5000/letters', (data) => setLetterBody(data[0].letterBodyText), 'letterBody', 'letterBody'); // Fetch letter body text
    fetchData('http://localhost:5000/conclusion', (data) => setConclusion(data[0].conclusion), 'conclusion', 'conclusion'); // Fetch conclusion text

  }, []);

  const renderSection = (loading, error, data, emptyMessage, renderContent) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (data.length === 0) return <p>{emptyMessage}</p>;
    return renderContent();
  };

  return (
    <div className="contact-container">
      <div className="coverlettermain-container-flex">
        <div className="contacts-section" >
          {renderSection(
            loadingState.contacts,
            errorState.contacts,
            contacts,
            'No contacts available',
            () => (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    <h1>
                      {contact.firstName} 
                    </h1>
                    <h1  className="Coverletter-contact-h2">{contact.lastName}</h1>
                    <div className="contact-details">
                      <h3 style={{color:"black"}}>Contact</h3>
                      <hr />
                      <strong>Phone:</strong> {contact.phone} <br />
                      <strong>Email:</strong> {contact.email} <br />
                      <strong>Address:</strong> {contact.city},<br></br> {contact.state}
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <div className="other-sections">
          <div className="subjects-section" style={{ marginTop: '140px',
            marginLeft:"-300px"
           }}>
            {renderSection(
              loadingState.subjects,
              errorState.subjects,
              subjects,
              'No subjects available',
              () => (
                <ul>
                  {subjects.map((subject) => (
                    <li key={subject._id} className="subject-of templ1">
                      <p>
                        <strong>Subject: </strong>{subject.subjectName}.
                      </p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div className="recipients-section recipientcontents-name">
            {renderSection(
              loadingState.recipients,
              errorState.recipients,
              recipients,
              'No recipients available',
              () => (
                <ul>
                  {recipients.map((recipient) => (
                    <li key={recipient._id}>
                      <p style={{ fontSize: '15px', marginLeft: '-250px' }}>
                        <strong>Dear:</strong> <span>{recipient.firstName} {recipient.lastName}, Hiring Manager at {recipient.companyName}.</span>
                      </p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          <div >
            {renderSection(
              loadingState.openingTexts,
              errorState.openingTexts,
              openingTexts,
              'No opening texts available',
              () => (
                <ul>
                  {openingTexts.map((text) => (
                    <li key={text._id}className="opening-texts-section" >{text.openingText}</li>
                  ))}
                </ul>
              )
            )}
          </div>
          <div >
            {loadingState.letterBody ? (
              <div>Loading...</div>
            ) : errorState.letterBody ? (
              <div>{errorState.letterBody}</div>
            ) : (
              <p style={{padding:"0 70px",}} className="letter-body-section">{letterBody}</p>
            )}
          </div>
          <div>
            {loadingState.conclusion ? (
              <div>Loading...</div>
            ) : errorState.conclusion ? (
              <div>{errorState.conclusion}</div>
            ) : (
              <p style={{padding:"0 70px",}} className="conclusion-section">{conclusion}</p>
            )}
            <br></br>
          </div>
          <div className="sincerely-section">
            <h3 style={{marginLeft:"120px"}}>Sincerely,</h3>
            {contacts.length > 0 && (
              <p style={{marginLeft:"-310px"}}>{contacts[0].firstName} {contacts[0].lastName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp1;