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
        <ClientNavBar/>
    <section>
        <h1>Vaccine Schedule</h1>
        <thead>
            <tr>
                
                <th>Vaccine Name</th>
                <th>week Range</th>
                <th>    </th>
            </tr>
        </thead>

        <tbody>
            {impOfVaccines.map((impOfVaccine)=>(
                <tr key={impOfVaccine.impofid}>
                    <td>{impOfVaccine.impofvaccine_name}</td>
                    <td>{impOfVaccine.impofWeekRange}</td>
                </tr>
            ))}
        </tbody>
    </section>
    </div>
  )
}


export default ViewVaccineList
