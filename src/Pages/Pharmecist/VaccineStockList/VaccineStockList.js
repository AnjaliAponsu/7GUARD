import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PharmecistNavBar from '../../../Component/Nav/PharmecistNavBar';

const VaccineStockList = () => {
  const[ vaccineList, setVaccineList] = useState([]);

    useEffect(()=>{
        loadVaccineList();
    },[]);

    const loadVaccineList = async () => {
        try {
            const result = await axios.get("http://localhost:8080/pvl/gpvl");
            if (result.status === 200) {
                setVaccineList(result.data);
            }
        } catch (error) {
            console.error('Error fetching vaccines:', error);
        }
    };
    
  return (
    <div>
        <PharmecistNavBar/>
    <section>
        <h1>Vaccine Stock List</h1>
        <table className='table table-bordered table-hover shadow container'>
            <thead>
                <tr className='text-center'>
                    <th>Vaccine Id</th>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {vaccineList.map((vaccine)=>(
                    <tr key={vaccine.pid}>
                    <td>{vaccine.pid}</td>
                    <td>{vaccine.vlistvaccine_name}</td>
                    <td>{vaccine.vlistquantity}</td>
                    </tr>

                ))}
            </tbody>
        </table>

    </section>
    </div>
  );
}

export default VaccineStockList
