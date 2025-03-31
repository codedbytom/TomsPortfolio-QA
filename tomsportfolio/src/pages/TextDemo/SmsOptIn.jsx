import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const SmsOptIn = ({ workOrderId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    countryCode: '1', // Default to US
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Import useNavigate

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL_HTTP}/OptIn/AddContact`, {
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        name: formData.name,
        workOrderId: workOrderId,
      });
      if (response.status === 200) {
        // Handle successful submission (e.g., show a success message)
        navigate('/TextDemo/SmsPreview', { state: { 
          phoneNumber: `${formData.countryCode}${formData.phoneNumber}` },
          contactName: formData.name
         });
      }
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div id="optInBody" className="container mt-4">
        <h3 className="text-center mb-4">Text Message Demo</h3>
        <div className="card mb-4">
          <div className="card-header text-center">
            Please provide your phone number below if you would like to subscribe for Text Message Surveys
          </div>
        </div>
        <form id="contactupdate" onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Name:</label>
            <div className="col-sm-9">
              <input
                type="text"
                id="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                title="Please use only letters, hyphens, and apostrophes"
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" htmlFor="PhoneNumber">Phone Number:</label>
            <div className="col-sm-9">
              <div className="input-group">
                <select
                  className="form-select country-code-select"
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                >
                  <option value="1">+1 (US)</option>
                  <option value="44">+44 (UK)</option>
                  <option value="52">+52 (MX)</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  id="PhoneNumber"
                  name="phoneNumber"
                  inputMode="numeric"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        <div className="card text-center mt-4">
          <div className="card-footer text-muted">
            By pressing "Submit," you consent to receive text messages from Tom Built This at the phone number provided. These messages may include requests for feedback on your experience and other business-related communications. Message frequency may vary. Standard message and data rates may apply. Reply STOP at any time to opt out.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SmsOptIn; 