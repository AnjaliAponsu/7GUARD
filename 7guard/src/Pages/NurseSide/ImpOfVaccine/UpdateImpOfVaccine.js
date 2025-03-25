import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./form.css";

const UpdateImpOfVaccine = () => {
    const { impofid } = useParams();
    let navigate = useNavigate();
    
    const [impOfVaccines, setImpOfVaccines] = useState({
        impofAge: '',
        impofWeekRange: '',
        impofvaccine_name: '',
        impofdescription: ''
    });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 

    console.log('impofid:', impofid);

    const loadImpofVaccine = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iov/vaccine/${impofid}`);
            console.log('ImpOfVaccine loaded:', response.data);
            setImpOfVaccines(response.data);
        } catch (error) {
            console.error('Error loading vaccine data:', error);
            setError('Error loading vaccine data');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (impofid) {
            loadImpofVaccine();
        } else {
            setError('No Id provided in the URL');
            setLoading(false);
        }
    }, [impofid]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setImpOfVaccines({ ...impOfVaccines, [name]: value });
    };

    const updateImpOfVaccine = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:8080/iov/uiov/${impofid}`, impOfVaccines);
            if (response.status === 200) {
                navigate("/vt");
            }
        } catch (error) {
            console.error("Error updating vaccine data:", error.response ? error.response.data : error.message);
            alert(`Error: ${error.response ? error.response.data.message : 'Update failed'}`);
        }
    };

    const { impofAge, impofWeekRange, impofvaccine_name, impofdescription } = impOfVaccines;

    // Show loading message or error message
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
            <form onSubmit={updateImpOfVaccine} className="form-inline">
                <h1 className="vhead">Update Vaccine</h1>

                <div className="form-group row mb-2">
                    <label htmlFor='impofAge' className="col-sm-2 col-form-label">Age: </label>
                    <div className="col-sm-8">
                    <select 
                        name='impofAge' 
                        id='impofAge'  
                        value={impofAge}
                        onChange={handleInputChange}
                        className="form-control dropdown-toggle"
                        required 
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
                    <label htmlFor='impofWeekRange' className="col-sm-2 col-form-label">Week_Range: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofWeekRange' 
                        value={impofWeekRange} 
                        required 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <label htmlFor='impofvaccine_name' className="col-sm-2 col-form-label">Vaccine_Name: </label>
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
                    <label htmlFor='impOfVaccineDescription' className="col-sm-2 col-form-label">Description: </label>
                    <div className="col-sm-8">
                    <input 
                        type='text' 
                        name='impofdescription'  
                        id='impOfVaccineDescription' 
                        value={impofdescription} 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    </div>
                </div>

                <button type="submit" className='btn vbtn mx-sm-2'>Save</button>
                <Link className='btn vbtn' to="/vt">Cancel</Link>
            </form>
        </div>
        </div>
        </div>
    );
};

export default UpdateImpOfVaccine;
