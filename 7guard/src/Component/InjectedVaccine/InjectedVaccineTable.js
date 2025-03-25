import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NurseNavBar from '../Nav/NurseNavBar';


export default function InjectedVaccineTable() {
  const navigate = useNavigate();
  const [injectedVaccine, setInjectedVaccine] = useState([]);



  useEffect(() => {
    const fetchInjectedVaccineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/Scan/getInjectedVaccine`);
        if (!response.ok) throw new Error('Failed to fetch scan  data');
        const data = await response.json();
        setInjectedVaccine(data);
      } catch (error) {
        console.error('Error fetching scan data:', error);
      }
    };

    fetchInjectedVaccineDetails();
  }, []);

 
   console.log(injectedVaccine)

  return (
    <div>
      <NurseNavBar/>
    <div>
      <h1 className='mb-4'>Injected Vaccine Records</h1>
    <div>
        <div >
          <table className='table table-bordered table-hover shadow container'>
            <thead>
              <tr className='text-center'>
                <th>Injected Vaccine Id</th>
                <th>Channeling Id</th>
                <th>CHDR</th>
                <th>Scan</th>
                <th>Vaccine Name</th>
                <th>Date</th>
                
              </tr>
            </thead>
            <tbody className='text-center'>
              {injectedVaccine.map(injectedVaccine => (
                <tr key={injectedVaccine.id}>
                  <td>{injectedVaccine.id}</td>
                  <td>{injectedVaccine.cha_id}</td>
                  <td>{injectedVaccine.chdr_id}</td>
                  <td>{injectedVaccine.scan}</td>
                  <td>{injectedVaccine.vaccine_name}</td>
                  <td>{injectedVaccine.date}</td>
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
