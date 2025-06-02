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
            console.error ("Error saving vaccine list :" ,error);
            alert("This vaccine is already excist.")
        }

    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
        
            <form onSubmit={saveImpOfVaccine} className="form-inline">
                <h1 className="vhead">Add Vaccine</h1>

                <div className="form-group row mb-2">
                    <label htmlFor='impofid' className="col-sm-2 col-form-label">Vaccine ID: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofid' 
                        value={impofid} 
                        required 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <label htmlFor='impOfVaccineName' className="col-sm-2 col-form-label">Vaccine Name: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofvaccine_name' 
                        value={impofvaccine_name} 
                        required 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>
                
                <div className="form-group row mb-2">
                    <label htmlFor='impofWeekRange' className="col-sm-2 col-form-label">Week Range: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofWeekRange'  
                        id='impofWeekRange' 
                        value={impofWeekRange} 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>

                <button type="submit" className='btn vbtn mx-sm-2'>Save</button>
                <Link to={"/vlt"}><button type="button" className='btn vbtn '>Cancel</button></Link>
            </form>
        </div>
        </div>
        </div>
    );
};

export default AddVaccineList;
