import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useNavigate } from "react-router-dom";

function StaffRegister({data, submitted}) {
    const navigate = useNavigate();
    const [s_fName, setS_fName] = useState('');
    const [s_lName, setS_lName] = useState('');
    const [s_nic, setS_nic] = useState('');
    const [s_mobileNumber, setS_mobileNumber] = useState('');
    const [s_workNumber, setS_workNumber] = useState('');
    const [s_personalEmail, setS_personalEmail] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [s_password, setS_password] = useState('');
    const [s_dob, setS_dob] = useState('');
    const [s_gender, setS_gender] = useState('');
    const [s_address, setS_address] = useState('');
    const [s_country, setS_country] = useState('');
    const [s_province, setS_province] = useState('');
    const [s_city, setS_city] = useState('');
    const [s_postalCode, setS_postalCode] = useState('');
    const [s_department, setS_department] = useState('');
    const [s_jobTitle, setS_jobTitle] = useState('');
    const [s_jobStartDate, setS_jobStartDate] = useState('');
    const [s_status, setS_status] = useState('');


    const provinceCityMap = {
        Central: ["Kandy", "Matale", "Nuwara Eliya"],
        Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
        "North Central": ["Anuradhapura", "Polonnaruwa"],
        Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
        "North Western": ["Kurunegala", "Puttalam"],
        Sabaragamuwa: ["Kegalle", "Ratnapura"],
        Southern: ["Galle", "Hambantota", "Matara"],
        Uva: ["Badulla", "Monaragala"],
        Western: ["Colombo", "Gampaha", "Kalutara"],
    };


    useEffect(() => {
        if (!submitted) {
            setS_fName('');
            setS_lName('');
            setS_nic('');
            setS_mobileNumber('');
            setS_workNumber('');
            setS_personalEmail('');
            setWorkEmail('');
            setS_password('');
            setS_dob('');
            setS_gender('');
            setS_address('');
            setS_country('');
            setS_province('');
            setS_city('');
            setS_postalCode('');
            setS_department('');
            setS_jobTitle('');
            setS_jobStartDate('');
            setS_status('');
        }
    }, [submitted]);
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const staffData = {
          s_fName:s_fName,
          s_lName:s_lName,
          s_nic:s_nic,
          s_mobileNumber:s_mobileNumber,
          s_workNumber:s_workNumber,
          s_personalEmail:s_personalEmail,
          workEmail:workEmail,
          s_password:s_password,
          s_dob:s_dob,
          s_gender:s_gender,
          s_address:s_address,
          s_country:s_country,
          s_province:s_province,
          s_city:s_city,
          s_postalCode:s_postalCode,
          s_department:s_department,
          s_jobTitle:s_jobTitle,
          s_jobStartDate:s_jobStartDate,
          s_status:s_status,
        };
    
        console.log(staffData);
        
            const response = await axios.post('http://localhost:8080/api/v1/saveStaff', staffData);
    
            if (response.status === 200 || response.status === 201) {
                alert("Staff Registered Successfully");
                navigate('/StaffDetails')

            } else {
                alert("Registration Failed");
            }
    };

    
    const cities = s_province ? provinceCityMap[s_province] || [] : [];

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-2 shadow form21" id='Body2'>
            <h1 className="ha4">Staff Registration Form</h1>
            <form onSubmit={handleSubmit} >
        <div>
        

        <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="s_fName" value={s_fName} onChange={e => setS_fName(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="s_lName" value={s_lName} onChange={e => setS_lName(e.target.value)}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="s_nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="s_nic" value={s_nic} onChange={e => setS_nic(e.target.value)}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="s_mobileNumber" value={s_mobileNumber} onChange={e => setS_mobileNumber(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_workNumber" className="input-group-text">Mobile Number-Work</label>
                <input type="tel" className="form-control col-sm-6" id="s_workNumber" value={s_workNumber} onChange={e => setS_workNumber(e.target.value)}/>
            </div>
            </div>
            </div>


            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="s_personalEmail" value={s_personalEmail} onChange={e => setS_personalEmail(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_workEmail" className="input-group-text">Work Email</label>
                <input type="email" className="form-control col-sm-6" id="workEmail" value={workEmail} onChange={e => setWorkEmail(e.target.value)}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="s_password" className="input-group-text">Password</label>
                <input type="password" className="form-control col-sm-6" id="s_password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                required value={s_password} onChange={e => setS_password(e.target.value)}/>
            </div>
            

            <div class="row">
            <div class="col">
                <div className="input-group mb-2">
                    <label htmlFor="s_dob" className="input-group-text">Date of Birth</label>
                    <input type="date" className="form-control col-sm-6" id="s_dob" value={s_dob} onChange={e => setS_dob(e.target.value)}/>
                </div>
            </div>
            

            <div class="col">
            <div className="input-group mb-2">
            <label className="input-group-text">Gender</label>
                <div className="form-check form-check-inline">
                    <input type="radio" name="s_gender" id="s_genderMale" value="Male" checked={s_gender === "Male"} onChange={e => setS_gender(e.target.value)}/>
                    <label class="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" name="s_gender" id="s_genderFemale" value="Female" checked={s_gender === "Female"} onChange={e => setS_gender(e.target.value)}/>
                    <label class="form-check-label">Female</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" name="s_gender" id="s_genderOther" value="Other" checked={s_gender === "Other"} onChange={e => setS_gender(e.target.value)}/>
                    <label class="form-check-label">Other</label>
                </div>
            </div>
            </div>
            </div>


            <div className="input-group mb-2">
                <label htmlFor="s_address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="s_address" value={s_address} onChange={e => setS_address(e.target.value)}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="s_country" className="form-select" value={s_country} onChange={e => setS_country(e.target.value)}>
                    <option value="" disabled>Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
            <select id="province" className="form-select" value={s_province} onChange={(e) => {
                setS_province(e.target.value);
                setS_city(""); 
            }}>

                <option value="" disabled> Province </option>
                    {Object.keys(provinceCityMap).map((prov) => (
                    <option key={prov} value={prov}>
                    {prov}
                </option>
            ))}
            </select>
            </div>
            </div>
            
            <div class="col">
            <div className="input-group mb-2">
            <select id="city" className="form-select" value={s_city} onChange={(e) => setS_city(e.target.value)} disabled={!s_province} >
                <option value="" disabled> City </option>
                    {cities.map((city) => (
                    <option key={city} value={city}>
                    {city}
                </option>
            ))}
            </select>
            </div>
            </div>
            
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_address" className="input-group-text">Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="s_postalCode" value={s_postalCode} onChange={e => setS_postalCode(e.target.value)}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="s_department" className="form-select" value={s_department} onChange={e => setS_department(e.target.value)}>
                    <option value="" disabled>Department</option>
                    <option value="Select1">Select1</option>
                    <option value="Select2">select2</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="s_jobTitle" className="form-select" value={s_jobTitle} onChange={e => setS_jobTitle(e.target.value)}>
                    <option value="" disabled>Job Title</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Receiptionist">Receiptionist</option>
                    <option value="Pharmacist">Pharmacist</option>
                </select>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="s_jobStartDate" className="input-group-text">Job Start Date</label>
                <input type="date" className="form-control col-sm-6" id="s_jobStartDate" value={s_jobStartDate} onChange={e => setS_jobStartDate(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="s_status" className="form-select" value={s_status} onChange={e => setS_status(e.target.value)}>
                    <option value="" disabled>Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>
            </div>
            </div>
            <button type="submit" className="btn vbtn">Register</button>
            
            </div>
            </form>

            </div>
            </div>
            </div>
            
    );
}

export default StaffRegister;
