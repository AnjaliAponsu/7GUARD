import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorNavBar from '../Nav/DoctorNavBar';


export default function PrescriptionTable() {
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState([]);



  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/Prescription/getAllPrescriptions`);
        if (!response.ok) throw new Error('Failed to fetch prescription  data');
        const data = await response.json();
        setPrescription(data);
      } catch (error) {
        console.error('Error fetching Prescription bill data:', error);
      }
    };

    fetchPrescriptionDetails();
  }, []);

 
   console.log(prescription)

  return (
    <div>
      <DoctorNavBar/>
    <div>
      <h1>Prescription Records</h1>
      <Link className='btn vbtn mb-2' to={'/Prescription'}>Add Prescription</Link>
    <div>
        <div >
          <table className='table table-bordered table-hover shadow container'>
            <thead>
              <tr className='text-center'>
                <th>Prescription Id</th>
                <th>Channeling Id</th>
                <th>CHDR</th>
                <th>Prescription</th>
                <th>Dose</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {prescription.map(prescription => (
                <tr key={prescription.id}>
                  <td>{prescription.id}</td>
                  <td>{prescription.cha_id}</td>
                  <td>{prescription.chdr_id}</td>
                  <td>{prescription.prescription}</td>
                  <td>{prescription.dose}</td>
                  <td>{prescription.p_date}</td>
                  <td>{prescription.p_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
