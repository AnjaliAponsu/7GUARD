import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';



function DoctorProfile(){

    const doctorWorkEmail = localStorage.getItem("email")

    const[UserData, setUserData] = useState({
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
        if (doctorWorkEmail) {
            fetchDoctorByEmail();
        } else {
            console.warn("Doctor Email is not set.");
        }
    }, [doctorWorkEmail]);

    const fetchDoctorByEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getDoctorByWorkEmail/${doctorWorkEmail}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const { 
                    docFullName, d_nic, d_mobileNumber, d_workNumber, d_personalEmail, doctorWorkEmail, d_dob, d_gender, d_department, d_licenseNumber,
                    d_specialization, d_address, d_city, d_country, d_province, d_postalCode, d_jobStartDate, d_status
                } = response.data;
    
                setUserData({ 
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

    return (

        <div className='Body1' style={{margin:'2%'}}>
        <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body2'>
            <form class="form">
            <h2 className="heading" style={{textAlign: 'center'}}>Doctor Profile</h2><br></br>
        <div>

        <div class="mb-3 row">
                <label for="fName" class="col-sm-3 col-form-label" style={{backgroundColor:'rgb(235, 197, 219)'}}>Full Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="firstName" id="fName" value={UserData.docFullName}/>
                </div>    
        </div>
      

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>NIC</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="lName" value={UserData.d_nic}/>
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="tel" name="lastName" id="email" value={UserData.d_mobileNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Work Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="tel" name="lastName" id="email" value={UserData.d_workNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Email</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_personalEmail} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Work Email</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.doctorWorkEmail} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Date of Birth</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_dob} />
                </div>
        </div>
        
        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Gender</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_gender} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Address</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_address} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>City</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_city} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Province</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_province} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Country</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_country} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Postal Code</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_postalCode} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>License Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_licenseNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Department</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_department} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>specialization</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_specialization} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Job Start Date</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_jobStartDate} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Status</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="lastName" id="email" value={UserData.d_status} />
                </div>
        </div>
        
    </div>

     </form>
    
     </div>
     </div>
    
    );
}
export default DoctorProfile;