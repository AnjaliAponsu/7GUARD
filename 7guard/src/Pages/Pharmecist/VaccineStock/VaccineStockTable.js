import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PharmecistNavBar from '../../../Component/Nav/PharmecistNavBar';

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
    <div>
        <PharmecistNavBar/>
    <section>
        <h1>Vaccine Stock</h1>
        <Link className='btn vbtn mb-2' to={"/avs"}>Add vaccine</Link>
        <table className='table table-bordered table-hover shadow container'>
            <thead>
                <tr className='text-center'>
                    <th>Vaccine Id</th>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                    <th>Expired Date</th>
                    <th>Manufacture date</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {vaccineList.map((vaccineList)=>(
                    <tr>
                    <td>{vaccineList.vlistid}</td>
                    <td>{vaccineList.vlistvaccine_name}</td>
                    <td>{vaccineList.vlistquantity}</td>
                    <td>{vaccineList.expiredDate}</td>
                    <td>{vaccineList.manufactureDate}</td>
                    <td>
                            <Link className='btn btn-danger' onClick={() => handleDelete(vaccineList.vlistid)}>Delete</Link>
                    </td>
                    </tr>

                ))}
            </tbody>
        </table>

    </section>
    </div>
    
  );
}

export default VaccineListTable
