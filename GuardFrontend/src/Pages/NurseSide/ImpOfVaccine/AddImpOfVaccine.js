import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddImpOfVaccine = () => {
    const navigate = useNavigate();
    const [impOfVaccines, setImpOfVaccines] = useState({
        impofid: '',
        impofAge: '',
        impofvaccine_name: '',
        impofWeekRange: '',
        impofdescription: ''
    });

    const { impofid, impofAge, impofvaccine_name, impofdescription, impofWeekRange } = impOfVaccines;

    const handleInputChange = (e) => {
        setImpOfVaccines({ ...impOfVaccines, [e.target.name]: e.target.value });
    };

    const saveImpOfVaccine = async (e) => {
        e.preventDefault(); 
        await axios.post("http://localhost:8080/iov/aiov", impOfVaccines);
        navigate("/vt");
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
                    <label htmlFor='impOfVaccineAge' >Age: </label>
                    <select 
                        name='impofAge' 
                        id='impOfVaccineAge'  
                        value={impofAge} 
                        onChange={handleInputChange}
                        required 
                    >
                        <option value={""}></option>
                        <option value={"AtBirth"}>At birth</option>
                        <option value={"6Week"}>6 Weeks</option>
                        <option value={"10Week"}>10 Weeks</option>
                        <option value={"14Week"}>14 Weeks</option>
                        <option value={"6Months"}>6 Months</option>
                        <option value={"9Months"}>9 Months</option>
                        <option value={"12Months"}>12 Months</option>
                        <option value={"18Months"}>18 Months</option>
                        <option value={"6Years"}>6 Years</option>
                    </select>
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

                <div>
                    <label htmlFor='impofdescription'>Description: </label>
                    <input 
                        type='text' 
                        name='impofdescription'  
                        id='impofdescription' 
                        value={impofdescription} 
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save</button>
                <Link to={"/vt"}><button type="button">Cancel</button></Link>
            </form>
        </div>
    );
};

export default AddImpOfVaccine;