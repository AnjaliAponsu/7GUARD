import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./form.css";

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
        try{
        await axios.post("http://localhost:8080/iov/aiov", impOfVaccines);
        navigate("/vt");
        }catch(error){
            console.error ("Error saving importance of vaccine :" ,error);
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
                    <label htmlFor='impOfVaccineAge' className="col-sm-2 col-form-label">Age: </label>
                    <div className="col-sm-8">
                    <select 
                        name='impofAge' 
                        id='impOfVaccineAge'  
                        value={impofAge} 
                        onChange={handleInputChange}
                        required 
                        className="form-control"
                    >
                        <option value={""}></option>
                        <option value={"AtBirth"}>At birth</option>
                        <option value={"2Months"}>2 Months</option>
                        <option value={"4Months"}>4 Months</option>
                        <option value={"6Months"}>6 Months</option>
                        <option value={"9Months"}>9 Months</option>
                        <option value={"12Months"}>12 Months</option>
                        <option value={"18Months"}>18 Months</option>
                        <option value={"3Years"}>3 Years</option>
                        <option value={"5Years"}>5 Years</option>
                        <option value={"11Years"}>11 Years</option>
                    </select>
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

                <div className="form-group row mb-2">
                    <label htmlFor='impofdescription' className="col-sm-2 col-form-label">Description: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofdescription'  
                        id='impofdescription' 
                        value={impofdescription} 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>

                <button type="submit" className='btn mx-sm-2 vbtn' >Save</button>
                <Link to={"/vt"} className='btn vbtn'>Cancel</Link>
            </form>
        </div>
        </div>
        </div>
    );
};

export default AddImpOfVaccine;
