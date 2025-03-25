import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NurseNavBar from '../../../Component/Nav/NurseNavBar';

const SendAdviceForm = () => {
  const navigate=useNavigate();
  const form = useRef(); // Ref for the form
  const [adviceData, setAdviceData] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [bmiStatus, setBmiStatus] = useState('');

  // Fetch advice based on BMI Status when bmiStatus changes
  useEffect(() => {
    const fetchAdviceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/advice/getAdviceByStatus/${bmiStatus}`);
        if (!response.ok) {
          throw new Error('Failed to fetch advice data');
        }
        const adviceList = await response.json();
        setAdviceData(adviceList);
      } catch (error) {
        console.error('Error fetching advice data:', error);
      }
    };

    if (bmiStatus) {
      fetchAdviceDetails();
    }
  }, [bmiStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'status') {
      setBmiStatus(value);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
  
    // Create a copy of the form data
    const formData = new FormData(form.current);
    
    // Add the BMI status to the form data
    formData.append('message2', bmiStatus);

    emailjs
      .sendForm('service_835ckx9', 'template_pzvfdwg', form.current, 'mvg2uaMtf6-wng8N6')
      .then(
        () => {
          alert('Email sent successfully!');
          navigate("/NurseCHDR")
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          alert('Failed to send email. Please try again.');
        }
      );
  
    e.target.reset();
    setEmail('');
    setBmiStatus('');
  };
  

  return (
    <div className='form20'>
      <NurseNavBar/>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '92vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
        
      
        <h1 className='ha4'>BMI Advices</h1>
        {adviceData ? (
          <form ref={form} onSubmit={sendEmail}>
            {/* Hidden input for BMI status */}
            <input 
              type="hidden" 
              name="message2" 
              value={bmiStatus} 
            />

<div className="form-group row mb-2">
  <label className='col-sm-2 col-form-label'>Email :</label>
          <div className='col-sm-9'>
          <input
          name="email"
          value={email}
          onChange={handleChange}
          className='form-control'
          type="email"
          placeholder="Enter recipient's email"
          required
        />
        </div>
        </div>
            
            <div className="form-group row mb-2">
              <div className='input-group mb-2'>
                <input 
                  className='form-control col-sm-6'  
                  type="hidden" 
                  name="useremail" 
                  value={email || ''} 
                  readOnly 
                />
              </div>

              <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>BMI Status :</label>
          
          <select 
            id='status' 
            className='form-select' 
            name='status' 
            value={bmiStatus} 
            onChange={(e) => setBmiStatus(e.target.value)} 
            required
          >
            <option value="" disabled>Select BMI Status</option>
            <option value="Obese">Obese</option>
            <option value="Overweight">Overweight</option>
            <option value="Normal">Normal</option>
            <option value="MildlyUnderweight">Mildly Underweight</option>
            <option value="ModeratelyUnderweight">Moderately Underweight</option>
            <option value=" Underweight"> Underweight</option>
          </select>          
        </div>

             
              <div className='input-group mb-2'>
                <label className='col-sm-2 col-form-label'>Advice :</label>
                <textarea 
                  rows={7} 
                  className='form-control col-sm-6'  
                  name="message" 
                  value={adviceData.message || ''} 
                  readOnly 
                />
              </div>
              
              
            </div>
            <button className="btn vbtn" type="submit">Send Message</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default SendAdviceForm;