import React, { useState, useEffect } from 'react';
import { getAllAdvice, deleteAdvice, updateAdvice } from '../../../Service/adviceService';
import AddAdviceForm from './AddAdviceForm';
import UpdateAdviceForm from './UpdateAdviceForm'; // Import the update form
import { Link } from 'react-router-dom';
import DoctorNavBar from '../../../Component/Nav/DoctorNavBar';

const AdviceTable = () => {
  const [adviceData, setAdviceData] = useState([]);
  const [selectedAdvice, setSelectedAdvice] = useState(null);

  useEffect(() => {
    getAllAdvice()
      .then((response) => {
        setAdviceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteAdvice(id)
      .then(() => {
        setAdviceData(adviceData.filter((advice) => advice.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting advice:", error);
      });
  };



  return (
    <div>
      <DoctorNavBar/>
      <AddAdviceForm onAddSuccess={() => getAllAdvice().then((response) => setAdviceData(response.data))} />

      <br/>
            <br/>
            <div className="border-bottom"></div>
            <br/>


      
      <h1 className="vhead">BMI Advices Table</h1>
      <table striped bordered hover table className='table table-bordered table-hover shadow container'>
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>BMI Status</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {adviceData.map((advice) => (
            <tr key={advice.id}>
              <td>{advice.id}</td>
              <td>{advice.bmiStatus}</td>
              <td><textarea rows={7}>{advice.message}</textarea></td>
              <td>
                <button className="btn btn-danger mx-sm-2" onClick={() => handleDelete(advice.id)}>
                  Delete
                </button>
                <button className="btn btn-primary" style={{ border: 'none', padding: 0 }}>
                    <Link
                      to={`/UpdateAdviceForm/${advice.id}`}
                      className="btn btn-primary"
                      style={{ textDecoration: 'none', color: 'white', border: 'none' }}
                    >
                      Update
                    </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdviceTable;
