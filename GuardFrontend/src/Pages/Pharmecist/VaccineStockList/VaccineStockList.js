import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VaccineStockList = () => {
  const[ vaccineList, setVaccineList] = useState([]);

    useEffect(()=>{
        loadVaccineList();
    },[]);

    const loadVaccineList = async () => {
        try {
            const result = await axios.get("http://localhost:8080/vl/gvl");
            if (result.status === 200) {
                setVaccineList(result.data);
            }
        } catch (error) {
            console.error('Error fetching vaccines:', error);
        }
    };

    
  return (
    <section>
        <h1>Vaccine Stock List</h1>
        <Link to={"/avts"}><button>Add vaccine</button></Link>
        <table>
            <thead>
                <tr>
                    <th>Vaccine Id</th>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {vaccineList.map((vaccineList)=>(
                    <tr>
                    <td>{vaccineList.vlistid}</td>
                    <td>{vaccineList.vlistvaccineName}</td>
                    <td>{vaccineList.vlistquantity}</td>
                    </tr>

                ))}
            </tbody>
        </table>

    </section>
    
  );
}

export default VaccineStockList
