import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateAdvice , getAdviceById} from '../../../Service/adviceService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAdviceForm = () => {
  const navigate = useNavigate();
  const {id}= useParams();  
  const [advice, setAdvice] =useState([]);
  const[error, setError] = useState('');
  const[adviceData, setAdviceData] = useState({
    bmiStatus:'',
    message:''
  });


  useEffect(() => {
    if (id) {
        fetcAdviceById();
    } else {
        console.warn("Advice ID is not set.");
    }
}, [id]);

console.log("Id", id)

const fetcAdviceById = async () => {
    try {
        const response = await getAdviceById(id);
        console.log('API Response:', response);

        if (response?.data) {
            const { 
                id,
                bmiStatus,
                message

            } = response.data;

            setAdviceData({ 
              id,
              bmiStatus,
              message
            });

            console.log("Advice Data: ", response.data)

        } 
        
        else {
            console.error('Advice not found:', response.data?.message || 'No additional details.');
            alert('Advice not found. Please check the ID and try again.');
        }

    } catch (error) {
        console.error('Error fetching Advice data:', error);
        alert('An error occurred while fetching the Advice data. Please try again later.');
    }
};



const handleInputChange = (event) => {
  const {name, value} = event.target;
  setAdviceData ((previousUserData) => ({
      ...previousUserData,
      [name]: value
  }));
};


  const handleSubmit = (e) => {
    e.preventDefault();

    try{
      const payload = {
        id: adviceData.id,
        bmiStatus: adviceData.bmiStatus,
        message: adviceData.message,
      };

      const response = updateAdvice(id,payload);
      alert("Updated successfully")
      navigate('/advice');
    }

      catch{
        console.error("Erroor updating advice. ", error);
      }
    };

  return (
    <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
      <h1 className='vhead'>Update BMI Advices</h1>
      
      <Form onSubmit={handleSubmit} className="form-inline">

      <div className="form-group row mb-2">
          <label className="col-sm-2 col-form-label">ID : </label>
          <div className="col-sm-8">
          <input
            type="text"
            name='id'
            value={adviceData.id}
            className="form-control"
            disabled
            required
          />
        </div>
        </div>

        <div className="form-group row mb-2">
          <label className="col-sm-2 col-form-label">BMI Status : </label>
          <div className="col-sm-8">
          <input
            type="text"
            name='bmiStatus'
            className="form-control"
            value={adviceData.bmiStatus}
            onChange={handleInputChange}
            required
          />
          </div>
          </div>

        <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Message : </label>
        <div className="col-sm-8">
            <textarea rows={5} cols={100}
            name='message'
            className="form-control"
            value={adviceData.message}
            onChange={handleInputChange}
            required>
            </textarea>
          </div>
          </div>
      
        
        <button className='btn vbtn' type="submit">
          Update Advice
        </button>
      </Form>
    </div>
    </div>
    </div>
  );
};

export default UpdateAdviceForm;
