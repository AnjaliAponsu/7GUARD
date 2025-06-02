import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NurseNavBar from '../../../../Component/Nav/NurseNavBar';

const VaccineListTable = () => {
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
        const confirmed = window.confirm("Do you want to delete "+impofid+ " vaccine id related details?");
        if(confirmed){
            await axios.delete(`http://localhost:8080/iov/diov/${impofid}`);
            loadImpofvaccines();
        }
        

        
    };
    
  return (
    <div>
        <NurseNavBar/>
    <section>
        <h1>Vaccine Schedule</h1>
        <Link to={"/avl"} className="btn vbtn mb-2">Add Vaccine</Link>
        <table className='table table-bordered table-hover shadow container'>
        <thead>
            <tr className='text-center'>
                <th>Vaccine Id</th>
                <th>Vaccine Name</th>
                <th>week Range</th>
                
            </tr>
        </thead>

        <tbody className='text-center'>
            {impOfVaccines.map((impOfVaccine)=>(
                <tr key={impOfVaccine.impofid}>
                    <th>{impOfVaccine.impofid}</th>
                    <td>{impOfVaccine.impofvaccine_name}</td>
                    <td>{impOfVaccine.impofWeekRange}</td>
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


export default VaccineListTable
