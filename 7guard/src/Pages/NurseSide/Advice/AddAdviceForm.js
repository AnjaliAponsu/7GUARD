import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { saveAdvice } from '../../../Service/adviceService';

const AddAdviceForm = ({ onAddSuccess }) => {
  const [bmiStatus, setBmiStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const adviceDTO = { bmiStatus, message };

    saveAdvice(adviceDTO)
      .then((response) => {
        alert(response.data); // Success message
        onAddSuccess(); // Call the parent function to refresh the advice table
        setBmiStatus('');
        setMessage('');
      })
      .catch((error) => {
        console.error("Error saving advice:", error);
        alert("Failed to save advice");
      });
  };

  return (
    <div className="mb-3">
       
        <div className="container d-flex align-items-center justify-content-center">
        <div className="col-sm-8 py-2 px-5 shadow form21">
        <h1 className='vhead'>Add New BMI Advices</h1>
        
      <Form onSubmit={handleSubmit}>
      <div className="form-group row mb-2">
          <label className="col-sm-2 col-form-label">BMI Status :</label>
          <div className="col-sm-8">
          <select id='status' className='form-select' value={bmiStatus} onChange={(e) => setBmiStatus(e.target.value)} required>
            <option value="" disabled>Select BMI Status</option>
            <option value="Obese">Obese</option>
            <option value="Overweight">Overweight</option>
            <option value="Normal">Normal</option>
            <option value="Mildly Underweight">Mildly Underweight</option>
            <option value="Moderately Underweight">Moderately Underweight</option>
            <option value="Underweight">Underweight</option>
            <option value="Severely Underweight">Severely Underweight</option>
          </select>
      </div>
      </div>

      <div className="form-group row mb-2">
          <label className="col-sm-2 col-form-label">Message :</label>
          <div className="col-sm-8">
        
            <textarea rows={5} cols={100}
            placeholder="Enter Message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required/>
      
      </div>
      </div>
        <button  type="submit" className='btn vbtn' style={{border:'none'}}>
          Add Advice
        </button>
      </Form>
    </div>
    </div>
    </div>
    
  );
};

export default AddAdviceForm;
