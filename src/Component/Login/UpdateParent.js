import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams , useNavigate } from "react-router-dom";


function UpdateParent() {
    const navigate = useNavigate();
    const { parentNic} = useParams();
    const[UserData, setUserData] = useState({
        p_firstName: '',
        p_lastName: '',
        parentNic: '',
        p_mobileNumber: '',
        p_email: '',
        p_dob: '',
        p_gender: '',
        p_address: '',
        p_country :'',
        p_province :'',
        p_city :'',
        p_postalCode :'',
        p_relationship :'',
        emergencyContactName :'',
        emergencyContactNumber :'',
        emergencyContactRelation :''

    });


    useEffect(() => {
        fetchParentByNic(parentNic);
    },[parentNic]);

    const fetchParentByNic = async (parentNic) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getParentByNic/${parentNic}`);
            console.log('API Response:', response);
    
            // Adjusting the condition to match the actual structure of the response
            if (response?.data) {
                const { 
                    p_fName, p_lName, parentNic, 
                    p_mobileNumber, p_email, p_dob, p_gender, 
                    p_address, p_country, p_city, p_province, 
                    p_postalCode, p_relationship, 
                    emergencyContactName, emergencyContactNumber, 
                    emergencyContactRelation 
                } = response.data;
    
                // Update the user data state
                setUserData({ 
                    p_firstName: p_fName, 
                    p_lastName: p_lName, 
                    parentNic, 
                    p_mobileNumber, 
                    p_email, 
                    p_dob, 
                    p_gender, 
                    p_address, 
                    p_country, 
                    p_city, 
                    p_province, 
                    p_postalCode, 
                    p_relationship, 
                    emergencyContactName, 
                    emergencyContactNumber, 
                    emergencyContactRelation 
                });
    
                console.log('Parent Data:', response.data);
            } else {
                console.error('Parent not found:', response.data?.message || 'No additional details.');
                alert('Parent not found. Please check the NIC and try again.');
            }
        } catch (error) {
            console.error('Error fetching parent data:', error);
            alert('An error occurred while fetching the parent data. Please try again later.');
        }
    };
    

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserData ((previousUserData) => ({
            ...previousUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const payload = {
                p_fName: UserData.p_firstName, 
                p_lName: UserData.p_lastName,
                parentNic: UserData.parentNic,
                p_mobileNumber: UserData.p_mobileNumber,
                p_email: UserData.p_email,
                p_dob: UserData.p_dob,
                p_gender: UserData.p_gender,
                p_address: UserData.p_address,
                p_country: UserData.p_country,
                p_city: UserData.p_city,
                p_province: UserData.p_province,
                p_postalCode: UserData.p_postalCode,
                p_relationship: UserData.p_relationship,
                emergencyContactName: UserData.emergencyContactName,
                emergencyContactNumber: UserData.emergencyContactNumber,
                emergencyContactRelation: UserData.emergencyContactRelation,
            };
            const response = await axios.put(`http://localhost:8080/api/v1/updateParent/${UserData.parentNic}`, payload);
            alert("You have successfully update parent details")
            navigate('/ParentDetails')
            
        }
        catch(error){
            console.error('Error updating user: ', error);
        }
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
            <h1 className="ha4">Parent/Guardian Update Details Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lastName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="firstName" name="p_firstName" value={UserData.p_firstName} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lastName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="lastName" name="p_lastName" value={UserData.p_lastName} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" name="parentNic" value={UserData.parentNic} onChange={handleInputChange}/>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" name="p_dob" id="dob" value={UserData.p_dob} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <div className="form-check form-check-inline">
                    <div className="gender"><input type="radio" name="p_gender" id="gender" value="Male" checked={UserData.p_gender === "Male"} onChange={handleInputChange}/>Male</div>
                    <div className="gender"><input type="radio" name="p_gender" id="gender" value="Female" checked={UserData.p_gender === "Female"} onChange={handleInputChange}/>Female</div>
                    <div className="gender"><input type="radio" name="p_gender" id="gender" value="Other" checked={UserData.p_gender === "Other"} onChange={handleInputChange}/>Other</div>
                </div>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="mobileNumber" name="p_mobileNumber" value={UserData.p_mobileNumber} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="personalEmail" name="p_email" value={UserData.p_email} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="address" name="p_address" value={UserData.p_address} onChange={handleInputChange}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="country" className="form-select" name="p_country" value={UserData.p_country} onChange={handleInputChange}>
                    <option value="" disabled>Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="province" className="form-select" name="p_province" value={UserData.p_province} onChange={handleInputChange}>
                    <option value="" disabled>Province</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="North Central">North Central</option>
                    <option value="Northern">Northern</option>
                    <option value="North Western">North Western</option>
                    <option value="Sabaragamuwa">Sabaragamuwa</option>
                    <option value="Southern">Southern</option>
                    <option value="Uva">Uva</option>
                    <option value="Western">Western</option>
                </select>
            </div>
            </div>
            
            <div class="col">
            <div className="input-group mb-2">
                <select id="city" className="form-select" name="p_city" value={UserData.p_city} onChange={handleInputChange}>
                    <option value="" disabled>City</option>
                    <option value="Ampara">Ampara</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kegalle">Kegalle</option>
                    <option value="Kilinochchi">Kilinochchi</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Mannar">Mannar</option>
                    <option value="Matale">Matale</option>
                    <option value="Matara">Matara</option>
                    <option value="Monaragala">Monaragala</option>
                    <option value="Mullaitivu">Mullaitivu</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Puttalam">Puttalam</option>
                    <option value="Ratnapura">Ratnapura</option>
                    <option value="Trincomalee">Trincomalee</option>
                    <option value="Vavuniya">Vavuniya</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label className='input-group-text'>Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="postalCode" name="p_postalCode"  value={UserData.p_postalCode} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="relationship" className="input-group-text">Relationship to Child</label>
                <input type="text" className="form-control col-sm-6" id="relationship" name="p_relationship" value={UserData.p_relationship} onChange={handleInputChange}/>
            </div>

            <div className="input-group mb-2">
            <label>Emergency Contact Details</label><br></br><br></br>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactName" className="input-group-text">Name</label>
                <input type="text" className="form-control col-sm-6" id="emergencyContactName" name="emergencyContactName" value={UserData.emergencyContactName} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactNumber" className="input-group-text">Mobile Number</label>
                <input type="tel" className="form-control col-sm-6" id="emergencyContactNumber" name="emergencyContactNumber" value={UserData.emergencyContactNumber} onChange={handleInputChange}/>
            </div>
            </div>
            
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactRelation" className="input-group-text">Relationship to Child</label>
                <input type="text" className="form-control col-sm-6" id="emergencyContactRelation" name="emergencyContactRelation" value={UserData.emergencyContactRelation} onChange={handleInputChange}/>
            </div>
            </div>
            </div>
            </div>
        
            <button type="submit" className="btn vbtn">Update</button>
            
            </div>
            </form>

            </div>
            </div>
            </div>
            
            
    );
}

export default UpdateParent;
