import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams } from "react-router-dom";


function StaffProfile(){

    const workEmail = localStorage.getItem("email")
    console.log("email: ", workEmail)

    const[UserData, setUserData] = useState({
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
        s_city: '',
        s_country: '',
        s_province: '',
        s_postalCode: '',
        s_jobStartDate: '',
        s_status: ''

    });


    useEffect(() => {
        if (workEmail) {
            fetchStaffByEmail();
        } else {
            console.warn("Staff Email is not set.");
        }
    }, [workEmail]);

    const fetchStaffByEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getStaffByWorkEmail/${workEmail}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const { 
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
                } = response.data;
    
                setUserData({ 
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
            console.error('Error fetching staff data:', error);
            alert('An error occurred while fetching the staff data. Please try again later.');
        }
    };

    return (

        <div className='Body1' style={{margin:'2%'}}>
        <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body2'>
            <form class="form">
            <h2 className="ha4">Staff Profile</h2><br></br>
        <div>

        <div class="mb-3 row">
                <label for="fName" class="col-sm-3 col-form-label" style={{backgroundColor:'rgb(235, 197, 219)'}}>First Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="firstName" id="fName" value={UserData.s_fName}/>
                </div>    
        </div>

        <div class="mb-3 row">
                <label for="fName" class="col-sm-3 col-form-label" style={{backgroundColor:'rgb(235, 197, 219)'}}>Last Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="lastName" id="lName" value={UserData.s_lName}/>
                </div>    
        </div>
      

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>NIC</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="nic" id="nic" value={UserData.s_nic}/>
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="tel" name="mobileNumber" id="mobileNumber" value={UserData.s_mobileNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Work Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="tel" name="workNumber" id="workNumber" value={UserData.s_workNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Email</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="personalEmail" id="personalEmail" value={UserData.s_personalEmail} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Work Email</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="workEmail" id="workEmail" value={UserData.workEmail} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Date of Birth</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="dob" id="dob" value={UserData.s_dob} />
                </div>
        </div>
        
        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Gender</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="gender" id="gender" value={UserData.s_gender} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Address</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="address" id="address" value={UserData.s_address} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>City</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="city" id="city" value={UserData.s_city} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Province</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="province" id="province" value={UserData.s_province} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Country</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="country" id="country" value={UserData.s_country} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Postal Code</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="postalCode" id="postalCode" value={UserData.s_postalCode} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Job Title</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="jobTitle" id="jobTitle" value={UserData.s_jobTitle} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Department</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="department" id="department" value={UserData.s_department} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Job Start Date</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="jobStartDate" id="jobStartDate" value={UserData.s_jobStartDate} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Status</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="status" id="status" value={UserData.s_status} />
                </div>
        </div>
        
    </div>

     </form>
    
     </div>
     </div>
    
    );
}
export default StaffProfile;