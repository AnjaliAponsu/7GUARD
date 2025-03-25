import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useNavigate } from "react-router-dom";

function DoctorRegister({data, submitted}) {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [nic, setNic] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [workNumber, setWorkNumber] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [department, setDepartment] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [jobStartDate, setJobStartDate] = useState('');
    const [status, setStatus] = useState('');

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
            setFullName('');
            setNic('');
            setMobileNumber('');
            setWorkNumber('');
            setPersonalEmail('');
            setWorkEmail('');
            setPassword('');
            setDob('');
            setGender('');
            setAddress('');
            setCountry('');
            setProvince('');
            setCity('');
            setPostalCode('');
            setDepartment('');
            setSpecialization('');
            setLicenseNumber('');
            setJobStartDate('');
            setStatus('');
        }
    }, [submitted]);
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const doctorData = {
            docFullName: fullName,
            d_nic: nic,
            d_mobileNumber: mobileNumber,
            d_workNumber: workNumber,
            d_personalEmail: personalEmail,
            d_password: password,
            doctorWorkEmail: workEmail,
            d_gender: gender,
            d_department: department,
            d_licenseNumber: licenseNumber,
            d_specialization: specialization,
            d_dob: dob,
            d_address: address,
            d_country: country,
            d_province: province,
            d_city: city,
            d_postalCode: postalCode,
            d_jobStartDate: jobStartDate,
            d_status: status,
        };

    
        console.log(doctorData);
        
            const response = await axios.post('http://localhost:8080/api/v1/saveDoctor', doctorData);
    
            if (response.status === 200 || response.status === 201) {
                alert("Doctor Registered Successfully");
                navigate('/DoctorDetails')
                
            } else {
                alert("Registration Failed");
            }
    };

    const cities = province ? provinceCityMap[province] || [] : [];

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-2 shadow form21" id='Body2'>
            <h1 className="ha4">Doctor Registration Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>
        
            <div className="input-group mb-2">
                <label htmlFor="fullName" className="input-group-text">Full Name</label>
                <input type="text" className="form-control col-sm-6" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required/>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" value={nic} onChange={e => setNic(e.target.value)} required/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="mobileNumber" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="workNumber" className="input-group-text">Mobile Number-Work</label>
                <input type="tel" className="form-control col-sm-6" id="workNumber" value={workNumber} onChange={e => setWorkNumber(e.target.value)}/>
            </div>
            </div>
            </div>


            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="personalEmail" value={personalEmail} onChange={e => setPersonalEmail(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="workEmail" className="input-group-text">Work Email</label>
                <input type="email" className="form-control col-sm-6" id="workEmail" value={workEmail} onChange={e => setWorkEmail(e.target.value)} required/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="password" className="input-group-text">Password</label>
                <input type="password" className="form-control col-sm-6" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="dob" value={dob} onChange={e => setDob(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                
                <div className="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="genderMale" value="Male" checked={gender === "Male"} onChange={e => setGender(e.target.value)}/>
                    <label class="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="Female" checked={gender === "Female"} onChange={e => setGender(e.target.value)}/>
                    <label class="form-check-label">Female</label>
                </div>
                <div className="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="genderOther" value="Other" checked={gender === "Other"} onChange={e => setGender(e.target.value)}/>
                    <label class="form-check-label">Other</label>
                </div>
                </div>
            </div>
            </div>
            
           
            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="address" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="country" className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="" disabled>Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
            <select id="province" className="form-select" value={province} onChange={(e) => {
                setProvince(e.target.value);
                setCity(""); 
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
            <select id="city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)} disabled={!province} >
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
                <label htmlFor="address" className="input-group-text">Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="postalCode" value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="department" className="form-select" value={department} onChange={e => setDepartment(e.target.value)}>
                    <option value="" disabled>Department</option>
                    <option value="Select1">Select1</option>
                    <option value="Select2">select2</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="specialization" className="form-select" value={specialization} onChange={e => setSpecialization(e.target.value)}>
                    <option value="" disabled>Specialities</option>
                    <option value="Neonatologist">Neonatologist</option>
                    <option value="Paediatric Cardiologist">Paediatric Cardiologist</option>
                    <option value="Paediatric Endocrinologist">Paediatric Endocrinologist</option>
                    <option value="Paediatric Nephrologistt">Paediatric Nephrologist</option>
                    <option value="Paediatric Neurologist">Paediatric Neurologist</option>
                    <option value="Paediatric Oncological Surgeon">Paediatric Oncological Surgeon</option>
                    <option value="Paediatric Psychologist">Paediatric Psychologist</option>
                    <option value="Speech & Language Therapist">Speech & Language Therapist</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="licenseNo" className="input-group-text">License Number</label>
                <input type="text" className="form-control col-sm-6" id="postalCode" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="jobStartDate" className="input-group-text">Job Start Date</label>
                <input type="date" className="form-control col-sm-6" id="jobStartDate" value={jobStartDate} onChange={e => setJobStartDate(e.target.value)}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="status" className="form-select" value={status} onChange={e => setStatus(e.target.value)} required>
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

export default DoctorRegister;
