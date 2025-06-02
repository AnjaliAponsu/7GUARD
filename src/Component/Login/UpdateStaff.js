import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams , useNavigate } from "react-router-dom";


function UpdateStaff(){
    const navigate = useNavigate();
    const { s_id } = useParams(); 

    const[UserData, setUserData] = useState({
        s_id: '',
        s_fName: '',
        s_lName: '',
        s_nic: '',
        s_mobileNumber: '',
        s_workNumber: '',
        s_personalEmail: '',
        workEmail: '',
        s_dob: '',
        s_gender: '',
        s_department: '',
        s_jobTitle: '',
        s_address: '',
        s_country :'',
        s_province :'',
        s_city :'',
        s_postalCode :'',
        s_jobStartDate :'',
        s_status :'',

    });


    useEffect(() => {
        if (s_id) {
            fetchStaffById();
        } else {
            console.warn("Staff ID is not set.");
        }
    }, [s_id]);

    const fetchStaffById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getStaffById/${s_id}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const { 
                    s_fName, s_lName, s_nic, s_mobileNumber, s_workNumber, s_personalEmail, workEmail, s_dob, s_gender, s_department, s_jobTitle
                    , s_address, s_city, s_country, s_province, s_postalCode, s_jobStartDate, s_status
                } = response.data;
    
                setUserData({ 
                    s_id: UserData.s_id,
                    s_fName,
                    s_lName,
                    s_nic,
                    s_mobileNumber,
                    s_workNumber,
                    s_personalEmail,
                    workEmail,
                    s_dob,
                    s_gender,
                    s_department,
                    s_jobTitle,
                    s_address,
                    s_city,
                    s_country,
                    s_province,
                    s_postalCode,
                    s_jobStartDate,
                    s_status
                });
    
                console.log('Staff Data:', response.data);
            } else {
                console.error('Staff not found:', response.data?.message || 'No additional details.');
                alert('Staff not found. Please check the Email and try again.');
            }
        } catch (error) {
            console.error('Error fetching Staff data:', error);
            alert('An error occurred while fetching the Staff data. Please try again later.');
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
                s_fName: UserData.s_fName,
                s_lName: UserData.s_lName,
                s_nic: UserData.s_nic,
                s_mobileNumber: UserData.s_mobileNumber,
                s_workNumber: UserData.s_workNumber,
                s_personalEmail: UserData.s_personalEmail,
                workEmail: UserData.workEmail,
                s_dob: UserData.s_dob,
                s_gender: UserData.s_gender,
                s_department: UserData.s_department,
                s_jobTitle: UserData.s_jobTitle,
                s_address: UserData.s_address,
                s_city: UserData.s_city,
                s_country: UserData.s_country,
                s_province: UserData.s_province,
                s_postalCode: UserData.s_postalCode,
                s_jobStartDate: UserData.s_jobStartDate,
                s_status: UserData.s_status
            };

            const response = await axios.put(`http://localhost:8080/api/v1/updateStaff/${s_id}`, payload);
            alert("You have successfully update Staff details")
            navigate('/StaffDetails')
        }
        catch(error){
            console.error('Error updating user: ', error);
        }
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
            <h1 className="ha4">Staff Update Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>
        

        <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="s_fName" name="s_fName" value={UserData.s_fName} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="s_lName" name="s_lName" value={UserData.s_lName} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="s_nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="s_nic" name="s_nic" value={UserData.s_nic} onChange={handleInputChange}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="s_mobileNumber" name="s_mobileNumber" value={UserData.s_mobileNumber} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_workNumber" className="input-group-text">Mobile Number-Work</label>
                <input type="tel" className="form-control col-sm-6" id="s_workNumber" name="s_workNumber" value={UserData.s_workNumber} onChange={handleInputChange}/>
            </div>
            </div>
            </div>


            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="s_personalEmail" name="s_personalEmail" value={UserData.s_personalEmail} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_workEmail" className="input-group-text">Work Email</label>
                <input type="email" className="form-control col-sm-6" id="workEmail" name="workEmail" value={UserData.workEmail} disabled/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="s_dob" name="s_dob" value={UserData.s_dob} onChange={handleInputChange}/>
            </div>
            </div>
            
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <div className="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="s_gender" id="s_genderMale" value="Male" checked={UserData.s_gender === "Male"} onChange={handleInputChange}/>
                        <label class="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="s_gender" id="s_genderFemale" value="Female" checked={UserData.s_gender === "Female"} onChange={handleInputChange}/>
                        <label class="form-check-label">Female</label>
                </div>
                <div className="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="s_gender" id="s_genderOther" value="Other" checked={UserData.s_gender === "Other"} onChange={handleInputChange}/>
                        <label class="form-check-label">Other</label>
                </div>
            </div>
            </div>
            </div>



           

            <div className="input-group mb-2">
                <label htmlFor="s_address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="s_address" name="s_address" value={UserData.s_address} onChange={handleInputChange}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="s_country" className="form-select" name="s_country" value={UserData.s_country} onChange={handleInputChange}>
                    <option value="" disabled>Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="s_province" className="form-select" name="s_province" value={UserData.s_province} onChange={handleInputChange}>
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
                <select id="s_city" className="form-select" name="s_city" value={UserData.s_city} onChange={handleInputChange}>
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
                <label htmlFor="s_address" className="input-group-text">Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="s_postalCode" name="s_postalCode" value={UserData.s_postalCode} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="s_department" className="form-select" name="s_department" value={UserData.s_department} onChange={handleInputChange}>
                    <option value="" disabled>Department</option>
                    <option value="Select1">Select1</option>
                    <option value="Select2">select2</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="s_jobTitle" className="form-select" name="s_jobTitle" value={UserData.s_jobTitle} onChange={handleInputChange}>
                    <option value="" disabled>Job Title</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Receiptionist">Receiptionist</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Management">Management</option>
                </select>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_jobStartDate" className="input-group-text">Job Start Date</label>
                <input type="date" className="form-control col-sm-6" id="s_jobStartDate" name="s_jobStartDate" value={UserData.s_jobStartDate} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="s_status" className="form-select" name="s_status" value={UserData.s_status} onChange={handleInputChange}>
                    <option value="" disabled>Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
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

export default UpdateStaff;
