import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientNavBar from '../../../../Component/Nav/ClientNavBar';

const ViewVaccineList = () => {
    const [impOfVaccines, setImpOfVaccines] = useState([]);

    useEffect(()=>{
        loadImpofvaccines();
    },[]); 

    const loadImpofvaccines = async () => {
        try {
            const result = await axios.get("http://localhost:8080/iov/viov");
            if (result.status === 200) {
                const sortedVaccineList = result.data.sort((a, b) => a.impofWeekRange - b.impofWeekRange);
                setImpOfVaccines(sortedVaccineList);
            }
        } catch (error) {
            console.error('Error fetching vaccines:', error);
        }
    };

    
  return (
    <div>
        
    <section>
        <br/>
        <h1 className='ha4'>Vaccine Schedule</h1>
        <br/>
        <table className='table table-bordered shadow container'>
        <thead>
            <tr>
                <th>Week Range</th>
                <th>Vaccine Name</th>
            </tr>
        </thead>

        <tbody>
            {impOfVaccines.map((impOfVaccine)=>(
                <tr key={impOfVaccine.impofid}>
                    <td>{impOfVaccine.impofWeekRange}Weeks</td>
                    <td>{impOfVaccine.impofvaccine_name}</td>
                </tr>
            ))}
        </tbody>
        </table>
    </section>
    </div>
  )
}


export default ViewVaccineList
