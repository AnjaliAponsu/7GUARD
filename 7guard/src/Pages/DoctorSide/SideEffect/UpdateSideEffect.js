import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateSideEffect() {
  const { vaccineName } = useParams();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    vaccineName: '',
    sideEffect: '',
    medication: ''
  });

  const [sideEffect, setSideEffect] = useState({});
  const [vaccineStock, setVaccineStock] = useState([]);

  useEffect(() => {
    const fetchSideEffectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/side-effect/view_side_effects/${vaccineName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const reviewData = await response.json();
        setSideEffect(reviewData);

      
        setFormData({
          vaccineName: reviewData.vaccineName || '',
          sideEffect: reviewData.sideEffect || '',
          medication: reviewData.medication || ''
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSideEffectDetails();
  }, [vaccineName]);


  useEffect(() => {
    const fetchVaccineStock = async () => {
      try {
        const response = await fetch('http://localhost:8080/iov/viov');
        if (!response.ok) {
          throw new Error('Failed to fetch Vaccine');
        }
        const itemStockData = await response.json();
        setVaccineStock(itemStockData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchVaccineStock();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const sideeffectdata = {
      mId: sideEffect.mid,
      vaccineName: formData.vaccineName,
      sideEffect: formData.sideEffect,
      medication: formData.medication
    };

    try {
      await axios.put(`http://localhost:8080/api/side-effect/update_side_effects/${sideEffect.mid}`, sideeffectdata);
      alert('Side effect updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating side effect:', error);
      alert('Error updating side effect!');
    }
  };

  return (
    <div className='form20'>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
          <h1 className="vhead">Update Vaccine Side Effects</h1>
          <form onSubmit={handleSubmit} className="form-inline">

            <div className="form-group row mb-2">
              <label className="col-sm-2 col-form-label">Vaccine Name :</label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="vaccineName"
                  value={formData.vaccineName}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    ---Select Vaccine---
                  </option>
                  {vaccineStock.map((item) => (
                    <option key={item.impofid} value={item.impofvaccine_name}>
                      {item.impofvaccine_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row mb-2">
              <label className="col-sm-2 col-form-label">Side Effect :</label>
              <div className="col-sm-8">
                <textarea
                  className='form-control'
                  type="text"
                  name="sideEffect"
                  value={formData.sideEffect}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='input-group mb-2'>
              <label className='col-sm-2 col-form-label'>Medication :</label>
              <div className="col-sm-8">
                <textarea
                  className='form-control'
                  type="text"
                  name="medication"
                  value={formData.medication}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn vbtn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSideEffect;
