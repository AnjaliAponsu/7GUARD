import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVaccineList = () => {
    const navigate = useNavigate();
    const [impOfVaccines, setImpOfVaccines] = useState({
        impofid: '',
        impofvaccine_name: '',
        impofWeekRange: '',
    });

    const { impofid, impofvaccine_name, impofWeekRange } = impOfVaccines;

    const handleInputChange = (e) => {
        setImpOfVaccines({ ...impOfVaccines, [e.target.name]: e.target.value });
    };

    const saveImpOfVaccine = async (e) => {
        e.preventDefault();
        try{ 
        await axios.post("http://localhost:8080/iov/aiov", impOfVaccines);
        navigate("/vlt");
        }catch(error){
            console.error ("Error saving food package :" ,error);
            alert("This vaccine is already excist.")
        }

    };

    return (
        <div>
            <form onSubmit={saveImpOfVaccine}>
                <h1>Add Vaccine</h1>

                <div>
                    <label htmlFor='impofid'>Vaccine ID: </label>
                    <input 
                        type='text' 
                        name='impofid' 
                        value={impofid} 
                        required 
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='impOfVaccineName'>Vaccine Name: </label>
                    <input 
                        type='text' 
                        name='impofvaccine_name' 
                        value={impofvaccine_name} 
                        required 
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor='impofWeekRange'>Week Range: </label>
                    <input 
                        type='text' 
                        name='impofWeekRange'  
                        id='impofWeekRange' 
                        value={impofWeekRange} 
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save</button>
                <Link to={"/vlt"}><button type="button">Cancel</button></Link>
            </form>
        </div>
    );
};

export default AddVaccineList