import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function SendAdviceForm () {
  const navigate=useNavigate();
  const {email,status}=useParams();
  const form = useRef(); // Ref for the form
  const [adviceData, setAdviceData] = useState({});
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchAdviceDetails = async () => {
      
      try {
        console.log("st",status)
        const response = await fetch(`http://localhost:8080/api/advice/getAdviceByStatus/${status}`);
        if (!response.ok) {
          throw new Error('Failed to fetch advice data');
        }
        const adviceList = await response.json();
        console.log(adviceList)
        setAdviceData(adviceList);
       
      } catch (error) {
        console.error('Error fetching advice data:', error);
      }
    };

    if (status) {
      fetchAdviceDetails();
    }
  }, [status]);
  console.log("advice",adviceData)

  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_8qoxn7c', 'template_lvcqqub', form.current, '6pNawksaQe2m3v005')
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

  };
  

  return (
    <div className='form20'>

      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '92vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
        
        <h1 className='ha4'>BMI Advices</h1>
        {adviceData ? (
          <form ref={form} onSubmit={sendEmail}>
          <div className='fo3'>
          <div className='form-group row mb-2'>
            <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Email :</label>
            <div className='col-sm-6'>
            <input className='form-control'  name="useremail" value={email} readOnly />
            </div>
            </div>
          <div className='form-group row mb-2'>
            <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Bmi Status :</label>
            <div className='col-sm-6'>
            <input className='form-control'  name="message1" value={status|| ''} readOnly />
            </div>
            </div>
            <div className='form-group row mb-2'>
            <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Advices :</label>
            <div className='col-sm-6'>
            <textarea className='form-control'  name="message2" value={adviceData.message} readOnly />
            </div>
            </div>
            <button  className="btn vbtn"type="submit">Send Message</button>
            </div>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </div>
  );
}

