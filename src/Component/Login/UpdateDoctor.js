import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams , useNavigate } from "react-router-dom";


function UpdateDoctor(){
    const navigate = useNavigate();
    const { d_id } = useParams(); 

    const[UserData, setUserData] = useState({
        d_id: '',
        docFullName: '',
        d_nic: '',
        d_mobileNumber: '',
        d_workNumber: '',
        d_personalEmail: '',
        doctorWorkEmail: '',
        d_dob: '',
        d_gender: '',
        d_department: '',
        d_licenseNumber: '',
        d_specialization: '',
        d_address: '',
        d_country :'',
        d_province :'',
        d_city :'',
        d_postalCode :'',
        d_jobStartDate :'',
        d_status :'',

    });


    useEffect(() => {
        if (d_id) {
            fetchDoctorById();
        } else {
            console.warn("Doctor ID is not set.");
        }
    }, [d_id]);

    const fetchDoctorById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getDoctorById/${d_id}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const { 
                    docFullName, d_nic, d_mobileNumber, d_workNumber, d_personalEmail, doctorWorkEmail, d_dob, d_gender, d_department, d_licenseNumber,
                    d_specialization, d_address, d_city, d_country, d_province, d_postalCode, d_jobStartDate, d_status
                } = response.data;
    
                setUserData({ 
                    d_id: UserData.d_id,
                    docFullName,
                    d_nic,
                    d_mobileNumber,
                    d_workNumber,
                    d_personalEmail,
                    doctorWorkEmail,
                    d_dob,
                    d_gender,
                    d_department,
                    d_licenseNumber,
                    d_specialization,
                    d_address,
                    d_city,
                    d_country,
                    d_province,
                    d_postalCode,
                    d_jobStartDate,
                    d_status
                });
    
                console.log('Doctor Data:', response.data);
            } else {
                console.error('Doctor not found:', response.data?.message || 'No additional details.');
                alert('Doctor not found. Please check the Email and try again.');
            }
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            alert('An error occurred while fetching the doctor data. Please try again later.');
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
                docFullName: UserData.docFullName,
                d_nic: UserData.d_nic,
                d_mobileNumber: UserData.d_mobileNumber,
                d_workNumber: UserData.d_workNumber,
                d_personalEmail: UserData.d_personalEmail,
                doctorWorkEmail: UserData.doctorWorkEmail,
                d_dob: UserData.d_dob,
                d_gender: UserData.d_gender,
                d_department: UserData.d_department,
                d_licenseNumber: UserData.d_licenseNumber,
                d_specialization: UserData.d_specialization,
                d_address: UserData.d_address,
                d_city: UserData.d_city,
                d_country: UserData.d_country,
                d_province: UserData.d_province,
                d_postalCode: UserData.d_postalCode,
                d_jobStartDate: UserData.d_jobStartDate,
                d_status: UserData.d_status
            };

            const response = await axios.put(`http://localhost:8080/api/v1/updateDoctor/${d_id}`, payload);
            alert("You have successfully update Doctor details")
            navigate('/DoctorDetails')
        }
        catch(error){
            console.error('Error updating user: ', error);
        }
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-2 shadow form21" id='Body2'>
            <h1 className="ha4">Doctor Update Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>
        

        
            <div className="input-group mb-2">
                <label htmlFor="fullName" className="input-group-text">Full Name</label>
                <input type="text" className="form-control col-sm-6" id="fullName" name="docFullName" value={UserData.docFullName} onChange={handleInputChange}/>
            </div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" name="d_nic" value={UserData.d_nic} onChange={handleInputChange}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="mobileNumber" className="input-group-text">Mobile Number-Personal</label>
                <input type="tel" className="form-control col-sm-6" id="mobileNumber" name="d_mobileNumber" value={UserData.d_mobileNumber} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="workNumber" className="input-group-text">Mobile Number-Work</label>
                <input type="tel" className="form-control col-sm-6" id="workNumber" name="d_workNumber" value={UserData.d_workNumber} onChange={handleInputChange}/>
            </div>
            </div>
            </div>


            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="personalEmail" className="input-group-text">Personal Email</label>
                <input type="email" className="form-control col-sm-6" id="personalEmail" name="d_personalEmail" value={UserData.d_personalEmail} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="workEmail" className="input-group-text">Work Email</label>
                <input type="email" className="form-control col-sm-6" id="workEmail" name="doctorWorkEmail" value={UserData.doctorWorkEmail} onChange={handleInputChange}/>
            </div>
            </div>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="dob" name="d_dob" value={UserData.d_dob} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text" >Gender</label>
                <div className="form-check form-check-inline">
                <div className="gender"><input type="radio" name="d_gender" id="genderMale"  value="Male"  checked={UserData.d_gender === "Male"} onChange={handleInputChange}/>Male</div>
                <div className="gender"><input type="radio" name="d_gender" id="genderFemale" value="Female" checked={UserData.d_gender === "Female"} onChange={handleInputChange}/>Female</div>
                <div className="gender"><input type="radio" name="d_gender" id="genderOther" value="Other" checked={UserData.d_gender === "Other"} onChange={handleInputChange}/>Other</div>
                </div>
            </div>
            </div>
            </div>
           
            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Address</label>
                <input type="text" className="form-control col-sm-6" id="address" name="d_address" value={UserData.d_address} onChange={handleInputChange}/>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="country" className="form-select" name="d_country" value={UserData.d_country} onChange={handleInputChange}>
                    <option value="" disabled>Country</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="province" className="form-select" name="d_province" value={UserData.d_province} onChange={handleInputChange}>
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
                <select id="city" className="form-select" name="d_city" value={UserData.d_city} onChange={handleInputChange}>
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
                <label htmlFor="address" className="input-group-text">Postal Code</label>
                <input type="text" className="form-control col-sm-6" id="postalCode" name="d_postalCode" value={UserData.d_postalCode} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <select id="department" className="form-select" name="d_department" value={UserData.d_department} onChange={handleInputChange}>
                    <option value="" disabled>Department</option>
                    <option value="Select1">Select1</option>
                    <option value="Select2">select2</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="specialization" className="form-select" name="d_specialization" value={UserData.d_specialization} onChange={handleInputChange}>
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
                <input type="text" className="form-control col-sm-6" id="licenseNumber" name="d_licenseNumber" value={UserData.d_licenseNumber} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="jobStartDate" className="input-group-text">Job Start Date</label>
                <input type="date" className="form-control col-sm-6" id="jobStartDate" name="d_jobStartDate" value={UserData.d_jobStartDate} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <select id="status" className="form-select" name="d_status" value={UserData.d_status} onChange={handleInputChange}>
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

export default UpdateDoctor;
