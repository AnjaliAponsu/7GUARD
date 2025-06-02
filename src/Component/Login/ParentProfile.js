import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams, Link } from "react-router-dom";


function ParentProfile(){

    const { parentNic } = useParams(); 
    const { childId } = useParams(); 

    const[UserData, setUserData] = useState({
        parentNic: '',
        p_fName: '',
        p_lName: '',
        p_mobileNumber: '',
        p_email: '',
        p_gender: '',
        p_dob: '',
        p_address: '',
        p_country: '',
        p_province: '',
        p_city: '',
        p_postalCode: '',
        p_relationship: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
    });

    const [ChildData, setChildData] = useState([]);

    useEffect(() => {
        if (parentNic) {
            fetchParentByEmail();
        } else {
            console.warn("Parent NIC is not set.");
        }
    }, [parentNic]);

    const fetchParentByEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getParentByNic/${parentNic}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const {
                    parentNic,
                    p_fName,
                    p_lName,
                    p_mobileNumber,
                    p_email,
                    p_gender,
                    p_dob,
                    p_address,
                    p_country,
                    p_province,
                    p_city,
                    p_postalCode,
                    p_relationship,
                    emergencyContactName,
                    emergencyContactPhone,
                    emergencyContactRelation
                } = response.data;

                setUserData({
                    parentNic,
                    p_fName,
                    p_lName,
                    p_mobileNumber,
                    p_email,
                    p_gender,
                    p_dob,
                    p_address,
                    p_country,
                    p_province,
                    p_city,
                    p_postalCode,
                    p_relationship,
                    emergencyContactName,
                    emergencyContactPhone,
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

    useEffect(() => {
        if (parentNic) {
            fetchChildrenByParentNic();
        } else {
            console.warn("Parent NIC is not set.");
        }
    }, [parentNic]);

    const fetchChildrenByParentNic = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getChildrenByNic/${parentNic}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                setChildData(response.data);
                console.log('Child Data:', response.data);
            } else {
                console.error('Child not found:', response.data?.message || 'No additional details.');
                alert('Child not found. Please check the NIC and try again.');
            }
        } catch (error) {
            console.error('Error fetching child data:', error);
            alert('An error occurred while fetching the child data. Please try again later.');
        }
    };
    


    return (

        <div className='Body1'>
        <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body2'>
            <form class="form">
            <h1 className="ha4" style={{textAlign: 'center'}}>Parent Profile</h1><br></br>
        <div>

        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/>
        <div className='form-group row mb-2' ><h4 style={{textAlign:'center'}}>Personal Details</h4></div>
        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/><br></br>


        <div class="mb-3 row">
                <label for="fName" class="col-sm-3 col-form-label" style={{backgroundColor:'rgb(235, 197, 219)'}}>First Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="firstName" id="fName" value={UserData.p_fName}/>
                </div>    
        </div>

        <div class="mb-3 row">
                <label for="fName" class="col-sm-3 col-form-label" style={{backgroundColor:'rgb(235, 197, 219)'}}>Last Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="lastName" id="lName" value={UserData.p_lName}/>
                </div>    
        </div>
      

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>NIC</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="nic" id="nic" value={UserData.parentNic}/>
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="tel" name="mobileNumber" id="mobileNumber" value={UserData.p_mobileNumber} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Personal Email</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="email" id="email" value={UserData.p_email} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Date of Birth</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="dob" id="dob" value={UserData.p_dob} />
                </div>
        </div>
        
        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Gender</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="gender" id="gender" value={UserData.p_gender} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Address</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="address" id="address" value={UserData.p_address} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>City</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="city" id="city" value={UserData.p_city} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Province</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="province" id="province" value={UserData.p_province} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Country</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="country" id="country" value={UserData.p_country} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Postal Code</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="postalCode" id="postalCode" value={UserData.p_postalCode} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Relationship To the Child</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="relationship" id="relationship" value={UserData.p_relationship} />
                </div>
        </div><br></br>

        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/>
        <div className='form-group row mb-2' ><h4 style={{textAlign:'center'}}>Emergency Contact Person Details</h4></div>
        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/><br></br>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Name</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="emergencyContactName" id="emergencyContactName" value={UserData.emergencyContactName} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Mobile Number</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="jobStartDate" id="jobStartDate" value={UserData.emergencyContactPhone} />
                </div>
        </div>

        <div className='form-group row mb-2' >
                <label htmlFor='impofid' className='col-sm-3 col-form-label' style={{backgroundColor:'rgb(235, 197, 219)'}}>Relationship to the Child</label>
                <div className='col-sm-8'>
                <input className='form-control' type="text" name="emergencyContactRelation" id="emergencyContactRelation" value={UserData.emergencyContactRelation} />
                </div>
        </div><br></br>

        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/>
        <div className='form-group row mb-2' ><h4 style={{textAlign:'center'}}>Children Details</h4></div>
        <hr style={{border: 'none', borderTop: '2px solid black', margin: '20px 0'}}/><br></br>

        <>
    {ChildData.map((child, index) => (
        <div className='form-group row mb-2' key={index}>
            <label
                htmlFor={`fullName-${index}`}
                className='col-sm-2 col-form-label'
                style={{ backgroundColor: 'rgb(235, 197, 219)' }}
            >
                Child Name
            </label>
            <div className='col-sm-6'>
                <input
                    className='form-control'
                    type='text'
                    name={`fullName-${index}`}
                    id={`fullName-${index}`}
                    value={child.fullName} 
                    readOnly
                />
            </div>
            <div className='col-sm-2' > 
                
                <Link to={`/ChildProfile/${child.childId}`} className="btn text-white vbtn" >View CHDR</Link>
            </div>
            </div>
    ))}
</>

        
    </div>

     </form>
    
     </div>
     </div>
    
    );
}
export default ParentProfile;
