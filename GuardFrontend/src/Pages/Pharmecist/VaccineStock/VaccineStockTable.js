import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VaccineListTable = () => {

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

    const handleDelete =async (vlistid) => {
        await axios.delete(`http://localhost:8080/vl/dvl/${vlistid}`);
        loadVaccineList();
    };

    
  return (
    <section>
        <h1>Vaccine Stock</h1>
        <Link to={"/avs"}><button> Add vaccine </button></Link>
        <table>
            <thead>
                <tr>
                    <th>Vaccine Id</th>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                    <th>Expired Date</th>
                    <th>Manufacture date</th>
                </tr>
            </thead>
            <tbody>
                {vaccineList.map((vaccineList)=>(
                    <tr>
                    <td>{vaccineList.vlistid}</td>
                    <td>{vaccineList.vlistvaccineName}</td>
                    <td>{vaccineList.vlistquantity}</td>
                    <td>{vaccineList.ExpiredDate}</td>
                    <td>{vaccineList.manufactureDate}</td>
                    <td>
                            <Link onClick={() => handleDelete(vaccineList.vlistid)}><button>Delete</button></Link>
                    </td>
                    </tr>

                ))}
            </tbody>
        </table>

    </section>
    
  );
}

export default VaccineListTable
