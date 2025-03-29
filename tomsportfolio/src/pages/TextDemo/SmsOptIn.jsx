import React, { useState } from 'react';
import axios from 'axios';

const SmsOptIn = ({ workOrderId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/SMS/Subscribe?phoneNumber=${encodeURIComponent(formData.phoneNumber)}`);
      if (response.status === 200) {
        // Show success message
        alert('Subscription Successful!');
        window.location.href = '/SMS/Success';
      }
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <img src="/images/Logo_Dark_SVG.svg" style={{ paddingBottom: '5px' }} alt="Logo" />
      <h3 className="text-center">Opt In For SMS Messages</h3>
      
      <div className="card">
        <div className="card-header text-center">
          Provide your phone number below if you would like to subscribe for Text Message Surveys
        </div>
      </div>
      
      <br />
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={workOrderId} />
        
        <div className="row">
          <label className="col-sm-3">Name:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="row mt-3">
          <label className="col-sm-3">Phone Number:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              inputMode="numeric"
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-group text-center mt-3">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      
      <div className="card text-center mt-3">
        <div className="card-footer text-muted">
          By pressing "Submit," you consent to receive text messages from The Daniel Group at the phone number provided. 
          These messages may include requests for feedback on your experience and other business-related communications. 
          Message frequency may vary. Standard message and data rates may apply. Reply STOP at any time to opt out.
        </div>
      </div>
    </div>
  );
};

export default SmsOptIn; 