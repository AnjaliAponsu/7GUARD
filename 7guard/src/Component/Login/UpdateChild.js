import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams , useNavigate} from "react-router-dom";


function UpdateChild(){
    const navigate = useNavigate();
    const { child_id } = useParams(); 
    const [doctors, setDoctors] = useState([]); 

    const[UserData, setUserData] = useState({
        child_id: '',
        parentNic: '',
        c_fName: '',
        c_lName: '',
        c_dob: '',
        c_gender: '',
        relationshipToGuardian: '',
        c_bloodGroup: '',
        c_allergies: '',
        c_medicalCondition: '',
        assignDoctor: ''
    });

    useEffect(() => {
        if (child_id) {
            fetchChildById();
        } else {
            console.warn("Child ID is not set.");
        }
    }, [child_id]);

    const fetchChildById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/getChildById/${child_id}`);
            console.log('API Response:', response);
    
            if (response?.data) {
                const { 
                    child_id,
                    parentNic,
                    c_fName,
                    c_lName,
                    c_dob,
                    c_gender,
                    relationshipToGuardian,
                    c_bloodGroup,
                    c_allergies,
                    c_medicalCondition,
                    assignDoctor
                } = response.data;

                setUserData({ 
                    child_id,
                    parentNic,
                    c_fName,
                    c_lName,
                    c_dob,
                    c_gender,
                    relationshipToGuardian,
                    c_bloodGroup,
                    c_allergies,
                    c_medicalCondition,
                    assignDoctor
                });

                console.log("Child Data: ", response.data)

            } 
            
            else {
                console.error('Child not found:', response.data?.message || 'No additional details.');
                alert('Child not found. Please check the ID and try again.');
            }

        } catch (error) {
            console.error('Error fetching child data:', error);
            alert('An error occurred while fetching the child data. Please try again later.');
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
                parentNic: UserData.parentNic,
                c_fName: UserData.c_fName,
                c_lName: UserData.c_lName,
                c_dob: UserData.c_dob,
                c_gender: UserData.c_gender,
                relationshipToGuardian: UserData.relationshipToGuardian,
                c_bloodGroup: UserData.c_bloodGroup,
                c_allergies: UserData.c_allergies,
                c_medicalCondition: UserData.c_medicalCondition,
                assignDoctor: UserData.assignDoctor
            };

            const response = await axios.put(`http://localhost:8080/api/v1/updateChild/${child_id}`, payload);
            alert("You have successfully update Child details")
            navigate('/ChildrenDetails')
        }
        catch(error){
            console.error('Error updating user: ', error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/getDoctorNames')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the doctor names!", error);
            });
    }, []);

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
            <h1 className="ha4">Child Details Update Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">Parent NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" value={UserData.parentNic} disabled/>
            </div>
        
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="fName" name="c_fName" value={UserData.c_fName} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="lName" name="c_lName" value={UserData.c_lName} onChange={handleInputChange}/>
            </div>
            </div>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="dob" name="c_dob" value={UserData.c_dob} onChange={handleInputChange}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <div className="form-check form-check-inline">
                <div className="gender"><input type="radio" name="c_gender" id="genderMale" value="Male" checked={UserData.c_gender === "Male"} onChange={handleInputChange}/>Male</div>
                <div className="gender"><input type="radio" name="c_gender" id="genderFemale" value="Female" checked={UserData.c_gender === "Female"} onChange={handleInputChange}/>Female</div>
                <div className="gender"><input type="radio" name="c_gender" id="genderOther" value="Other" checked={UserData.c_gender === "Other"} onChange={handleInputChange}/>Other</div>
                </div>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="relation" className="input-group-text">Relationship to Guardian</label>
                <input type="text" className="form-control col-sm-6" id="relation" name="relationshipToGuardian" value={UserData.relationshipToGuardian} onChange={handleInputChange}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
            <label htmlFor="blood" className="input-group-text">Blood Group</label>
                <select id="blood" name="c_bloodGroup" className="form-select" value={UserData.c_bloodGroup} onChange={handleInputChange}>
                    <option value="" disabled>Select Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Do Baby have Allergies? </label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="c_allergies" id="inlineRadio1" value="Yes" checked={UserData.c_allergies === "Yes"} onChange={handleInputChange}/>
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="c_allergies" id="inlineRadio2" value="No" checked={UserData.c_allergies === "No"} onChange={handleInputChange}/>
                    <label class="form-check-label" for="inlineRadio2">No</label>
                </div>
            </div>
            </div>
            </div>
            
            <div className="input-group mb-2">
                <label htmlFor="medicalCondition" className="input-group-text">Medical Condition</label>
                <input type="text" className="form-control col-sm-6" id="medicalCondition" name="c_medicalCondition" value={UserData.c_medicalCondition} onChange={handleInputChange}/>
            </div>
            

            <div className="input-group mb-2">
                <label htmlFor="assignDoctor" className="input-group-text">Assign Doctor</label>
                <select 
                    className="form-select" 
                    id="assignDoctor" 
                    value={UserData.assignDoctor} 
                    name="assignDoctor"
                    onChange={handleInputChange}>
                    <option value="" disabled>Select a doctor</option>
                    {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>{doctor}</option>
                    ))}
                </select>
            </div>
            
                <button type="submit" className="btn vbtn">Update</button>
       
            </div>
            </form>

            </div>
            </div>
            </div>
            
    );
}

export default UpdateChild;
