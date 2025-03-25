import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useNavigate } from "react-router-dom";


function ParentRegister({data, submitted}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nic, setNic] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [relationship, setRelationship] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [emergencyContactRelation, setEmergencyContactRelation] = useState('');


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

    const navigate = useNavigate();

    useEffect(() => {
        if (!submitted) {
            setFirstName('');
            setLastName('');
            setNic('');
            setMobileNumber('');
            setPersonalEmail('');
            setDob('');
            setGender('');
            setAddress('');
            setCountry('');
            setProvince('');
            setCity('');
            setPostalCode('');
            setRelationship('');
            setEmergencyContactName('');
            setEmergencyContactNumber('');
            setEmergencyContactRelation('');
        }
    }, [submitted]);
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const parentData = {
            parentNic:nic,
            p_fName:firstName,
            p_lName:lastName,
            p_mobileNumber:mobileNumber,
            p_email:personalEmail,
            p_gender:gender,
            p_dob:dob,
            p_address:address,
            p_country:country,
            p_province:province,
            p_city:city,
            p_postalCode:postalCode,
            p_relationship:relationship,
            emergencyContactName:emergencyContactName,
            emergencyContactPhone:emergencyContactNumber,
            emergencyContactRelation:emergencyContactRelation
        };
    
        console.log(parentData);
        
        const response = await axios.post('http://localhost:8080/api/v1/saveParent', parentData);
    
        if (response.status === 200 || response.status === 201) {
            alert("Parent Registered Successfully");
            navigate('/ChildRegister')
        } else {
            alert("Registration Failed");
        }
    };

    const cities = province ? provinceCityMap[province] || [] : [];

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
            <h1 className="ha4">Parent/Guardian Registration Form</h1><br/>
            <form onSubmit={handleSubmit} >
        <div>

            <div class="row">
                <div class="col">
                  <div className="input-group mb-2">
                      <label htmlFor="lastName" className="input-group-text">First Name</label>
                      <input type="text" className="form-control col-sm-6" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                  </div>
                </div>
                <div class="col">
                  <div className="input-group mb-2">
                      <label htmlFor="lastName" className="input-group-text">Last Name</label>
                      <input type="text" className="form-control col-sm-6" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                  </div>
                </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" value={nic} onChange={e => setNic(e.target.value)} required/>
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
                        <input class="form-check-input" type="radio" name="gender" id="gender" value="Male" checked={gender === "Male"} onChange={e => setGender(e.target.value)}/>
                        <label class="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="gender" value="Female" checked={gender === "Female"} onChange={e => setGender(e.target.value)}/>
                        <label class="form-check-label">Female</label>
                </div>
                <div className="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" id="gender" value="Other" checked={gender === "Other"} onChange={e => setGender(e.target.value)}/>
                        <label class="form-check-label">Other</label>
                </div>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="mobileNumber" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} required/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="personalEmail" value={personalEmail} onChange={e => setPersonalEmail(e.target.value)} required/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="address" value={address} onChange={e => setAddress(e.target.value)} required/>
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
                <label className='input-group-text'>Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="postalCode"  value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
            </div>
            </div>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="relationship" className="input-group-text">Relationship to Child</label>
                <input type="text" className="form-control col-sm-6" id="relationship" value={relationship} onChange={e => setRelationship(e.target.value)} required/>
            </div>
            <br/>

            <div className="border-bottom"></div>
            

            <div className="input-group mb-2">
            <label>Emergency Contact Details</label><br></br><br></br>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactName" className="input-group-text">Name</label>
                <input type="text" className="form-control col-sm-6" id="emergencyContactName" value={emergencyContactName} onChange={e => setEmergencyContactName(e.target.value)} required/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactNumber" className="input-group-text">Mobile Number</label>
                <input type="text" className="form-control col-sm-6" id="emergencyContactNumber" value={emergencyContactNumber} onChange={e => setEmergencyContactNumber(e.target.value)} required/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="emergencyContactRelation" className="input-group-text">Relationship to Child</label>
                <input type="text" className="form-control col-sm-6" id="emergencyContactRelation" value={emergencyContactRelation} onChange={e => setEmergencyContactRelation(e.target.value)} required/>
            </div>
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

export default ParentRegister;
