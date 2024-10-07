import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NurseNavBar from '../../../Component/Nav/NurseNavBar';

const ImpOfVaccineTable = () => {

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

    const handleDelete =async (impofid) => {
        await axios.delete(`http://localhost:8080/iov/diov/${impofid}`);
        loadImpofvaccines();
    };
    
  return (
    <div>
    <NurseNavBar/>
    <section>
        <h1 class="text-danger">Importance of Vaccine</h1>
        <Link to={"/aiov"} className="btn btn-danger">Add Vaccine</Link>
        <table className='table table-bordered table-hover shadow container'>
        <thead>
            <tr className='text-center'>
                <th>Vaccine Id</th>
                <th>Vaccine Name</th>
                <th>Age</th>
                <th>Age(Week)</th>
                <th>Description</th>
            </tr>
        </thead>

        <tbody className='text-center'>
            {impOfVaccines.map((impOfVaccine)=>(
                <tr key={impOfVaccine.impofid}>
                    <th>{impOfVaccine.impofid}</th>
                    <td>{impOfVaccine.impofvaccine_name}</td>
                    <td>{impOfVaccine.impofAge}</td>
                    <td>{impOfVaccine.impofWeekRange}</td>
                    <td>{impOfVaccine.impofdescription}</td>
                    <td><Link className="btn btn-primary" to={`/uiov/${impOfVaccine.impofid}`}>Edit</Link></td>
                    <td>
                            <Link className="btn btn-danger" onClick={() => handleDelete(impOfVaccine.impofid)}>Delete</Link>
                    </td>
                </tr>

            ))}
            

        </tbody>
        </table>
    </section>
    </div>
  )
}

export default ImpOfVaccineTable

