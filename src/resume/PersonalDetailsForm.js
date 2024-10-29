// PersonalDetailsForm.js
import React, { useState } from 'react';
import './Form.css';

const PersonalDetailsForm = ({ onNext, updateData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateData(formData);
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      profession: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className="form-container">
      <h2>Tell Us About Yourself...</h2>
      <div className="form-grid">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input type="text" name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
