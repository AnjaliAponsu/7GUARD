import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
        <div>
            <form onSubmit={updateImpOfVaccine}>
                <h1>Update Vaccine</h1>

                <div>
                    <label htmlFor='impofAge'>Age: </label>
                    <select 
                        name='impofAge' 
                        id='impofAge'  
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
                        value={impofWeekRange} 
                        required 
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='impofvaccine_name'>Vaccine Name: </label>
                    <input 
                        type='text' 
                        name='impofvaccine_name' 
                        value={impofvaccine_name} 
                        required 
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='impOfVaccineDescription'>Description: </label>
                    <input 
                        type='text' 
                        name='impofdescription'  
                        id='impOfVaccineDescription' 
                        value={impofdescription} 
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save</button>
                <Link to="/vt">
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default UpdateImpOfVaccine;
