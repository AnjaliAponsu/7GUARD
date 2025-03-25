import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorNavBar from '../../../Component/Nav/DoctorNavBar';

const AdminPage = () => {
  const navigate=useNavigate();
  const [sideEffects, setSideEffects] = useState([]);
  const [vaccineStock, setVaccineStock] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [newSideEffect, setNewSideEffect] = useState({
    vaccineName:'',
    sideEffect: '',
    medication: ''
  });
  const [updateSideEffect, setUpdateSideEffect] = useState({
    mId: '',
    vaccineName: '',
    sideEffect: '',
    medication: ''
  });

  useEffect(() => {
    getAllSideEffects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSideEffect((prev) => ({ ...prev, [name]: value }));
  };
  


  const getAllSideEffects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/side-effect/admin/view_all');
      setSideEffects(response.data);
    } catch (error) {
      console.error('Error fetching side effects:', error);
    }
  };

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
        console.log(vaccineStock)


  const addSideEffect = async () => {
    try {
      await axios.post('http://localhost:8080/api/side-effect/add_side_effects', newSideEffect);
      getAllSideEffects();
      setNewSideEffect({ vaccineName: '', sideEffect: '', medication: '' }); 
      alert('Side effect added successfully!');
    } catch (error) {
      console.error('Error adding side effect:', error);
      alert(error.response?.data || 'Error adding side effect!');
    }
  };
  

  const deleteSideEffect = async (mId) => {
    try {
      await axios.delete(`http://localhost:8080/api/side-effect/delete_side_effects/${mId}`);
      getAllSideEffects();
      alert('Side effect deleted successfully!');
    } catch (error) {
      console.error('Error deleting side effect:', error);
      alert('Error deleting side effect!');
    }
  };

  const UpdateEffect = async (vaccineName) => {
   navigate(`/UpdateSideEffect/${vaccineName}`)
      };

  return (
    <div>
      <DoctorNavBar/>
    <div className="admin-page">

      <div className="container d-flex align-items-center justify-content-center">
        <div className="col-sm-8 py-2 px-5 shadow form21">
        <h1 className='vhead'>Add Vaccine Side Effect</h1>

        <div className="form-group row mb-2">
  <label className="col-sm-2 col-form-label">Vaccine Name :</label>
  <div className="col-sm-8">
    <select
      className="form-control"
      name="vaccineName" 
      value={newSideEffect.vaccineName} 
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
            type="text"
            placeholder="Side Effect"
            className="form-control"
            value={newSideEffect.sideEffect}
            onChange={(e) => setNewSideEffect({ ...newSideEffect, sideEffect: e.target.value })}
          />
        </div>
        </div>

        <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Medication :</label>
        <div className="col-sm-8">
        <textarea
          type="text"
          placeholder="Medication"
          className="form-control"
          value={newSideEffect.medication}
          onChange={(e) => setNewSideEffect({ ...newSideEffect, medication: e.target.value })}
        />
        </div>
        </div>


        <button onClick={addSideEffect} className='btn vbtn'>Add Side Effect</button>
      </div>
      </div>

      <br/>
            <br/>
            <div className="border-bottom"></div>
            <br/>
 

      {/* List of All Side Effects */}
      <h1 className='vhead'>Side Effects List</h1>
      <table className='table table-bordered table-hover shadow container'>
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>Vaccine Name</th>
            <th>Side Effect</th>
            <th>Medication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {sideEffects.map((sideEffect) => (
            <tr key={sideEffect.mId}>
              <td>{sideEffect.mid}</td>
              <td>{sideEffect.vaccineName}</td>
              <td>{sideEffect.sideEffect}</td>
              <td>{sideEffect.medication}</td>
              <td>
                <button className='btn btn-danger mx-sm-2' onClick={() => deleteSideEffect(sideEffect.mid)}>Delete</button>
                <button className='btn btn-primary' onClick={() => UpdateEffect(sideEffect.vaccineName)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminPage;
