import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVaccinesToStock = () => {
    const navigate = useNavigate();
    const [vaccineStock, setVaccineStock] = useState({
        vlistid: '',
        vlistvaccineName: '',
        vlistquantity: '',
    });

    const { vlistid, vlistvaccineName, vlistquantity, expiredDate, manufactureDate } = vaccineStock;

    const handleInputChange = (e) => {
        setVaccineStock({ ...vaccineStock, [e.target.name]: e.target.value });
    };

    const saveVaccineStock = async (e) => {
        e.preventDefault(); 
        await axios.post("http://localhost:8080/vl/avl", vaccineStock);
        navigate("/vsl");
    };

  return (
    <div>
        <form onSubmit={saveVaccineStock}>
            <h1>Add Vaccines in to the Stock</h1>

            <div>
                <label htmlFor='vlistid'>Vaccine Id</label>
                <input 
                    type='text' 
                    name='vlistid' 
                    id='vlistid'
                    value={vlistid}
                    onChange={handleInputChange}>
                </input>

            </div>
            <div>
                <label htmlFor='vlistvaccineName'>Vaccine Name</label>
                <input 
                    type='text' 
                    name='vlistvaccineName' 
                    id='vlistvaccineName'
                    value={vlistvaccineName}
                    onChange={handleInputChange}>
                </input>
            </div>
            <div>
                <label htmlFor='vlistquantity'>Quantity</label>
                <input 
                    type='text' 
                    name='vlistquantity' 
                    id='vlistquantity'
                    value={vlistquantity}
                    onChange={handleInputChange}>
                </input>
            </div>
            
            <button>Save</button>
            <Link to={'/vsl'}><button>Cancel</button></Link>

        </form>
      
    </div>
  )
}

export default AddVaccinesToStock
