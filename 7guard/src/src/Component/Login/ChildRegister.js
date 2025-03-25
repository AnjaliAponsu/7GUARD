import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useNavigate, useParams } from "react-router-dom";

function ChildRegister({data, submitted}) {
    const { parentNic } = useParams(); 

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [p_nic, setP_nic] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medicalCondition, setMedicalCondition] = useState('');
    const [assignDoctor, setAssignDoctor] = useState('');
    const [doctors, setDoctors] = useState([]); 
    const [parent, setParent] = useState(false);
    const [nicMessage, setNicMessage] = useState('');

    useEffect(() => {
        if (!submitted) {
            resetFields();
        }
    }, [submitted]);

    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setP_nic('');
        setDob('');
        setGender('');
        setRelation('');
        setBloodGroup('');
        setAllergies('');
        setMedicalCondition('');
        setAssignDoctor('');
        setParent(false);
        setNicMessage('');
    };

    const handleCheckNIC = async () => {
        if (!p_nic) {
            setNicMessage("Please enter a NIC.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/checkParentNIC?parentNic=${p_nic}`);
            const exists = response.data;

            if (exists) {
                setParent(true);
                setNicMessage("Parent NIC found in the system.");
            } else {
                setParent(false);
                setNicMessage("Parent NIC not found.");
            }
        } catch (error) {
            console.error("Error checking NIC:", error);
            setNicMessage("Error checking NIC.");
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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!parent) {
            alert("Please enter a valid Parent NIC before submitting.");
            return;
        }
    
        const childData = {
            c_fName: firstName,
            c_lName: lastName,
            c_dob: dob,
            c_gender: gender,
            relationshipToGuardian: relation,
            c_bloodGroup: bloodGroup,
            c_allergies: allergies,
            c_medicalCondition: medicalCondition,
            assignDoctor: assignDoctor, //Change in anjali code
            parentNic: p_nic,
        };
    
        console.log(childData);
        
            const response = await axios.post('http://localhost:8080/api/v1/saveChild', childData);
    
            if (response.status === 200 || response.status === 201) {
                alert("Child Registered Successfully");
                navigate('/ChildrenDetails')
            } else {
                alert("Registration Failed");
            }
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
            <h1 className="ha4">Child Registration Form</h1><br></br>
            <form onSubmit={handleSubmit} >
        <div>

            <div className="input-group mb-2">
                <label htmlFor="nic" className="input-group-text">Parent NIC</label>
                <input type="text" className="form-control col-sm-6" id="nic" value={parentNic} onChange={e => setP_nic(e.target.value)} required/>
                <button type="button" className="btn vbtn" onClick={handleCheckNIC}>Enter</button>
            </div>

            {nicMessage && <div className={`alert ${parent ? "alert-primary" : "alert-danger"}`}>{nicMessage}</div>}
        
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="fName" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={!parent} required/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="lName" value={lastName} onChange={e => setLastName(e.target.value)} disabled={!parent} required/>
            </div>
            </div>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-4" id="dob" value={dob} onChange={e => setDob(e.target.value)} disabled={!parent}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <div className="form-check form-check-inline">
                <div className="gender">
                    <input type="radio" name="gender" id="inli" value="Male" checked={gender === "Male"} onChange={e => setGender(e.target.value)} disabled={!parent}/>
                    Male</div>
                <div className="gender">
                    <input type="radio" name="gender" id="genderFemale" value="Female" checked={gender === "Female"} onChange={e => setGender(e.target.value)} disabled={!parent}/>
                    Female</div>
                <div className="gender">
                    <input type="radio" name="gender" id="genderOther" value="Other" checked={gender === "Other"} onChange={e => setGender(e.target.value)} disabled={!parent}/>
                    Other</div>
                </div>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="relation" className="input-group-text">Relationship to Guardian</label>
                <input type="text" className="form-control col-sm-8" id="relation" value={relation} onChange={e => setRelation(e.target.value)} disabled={!parent}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
            <label htmlFor="blood" className="input-group-text">Blood Group</label>
                <select id="blood" className="form-select" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} disabled={!parent}>
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
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Yes" checked={allergies === "Yes"} onChange={e => setAllergies(e.target.value)} disabled={!parent}/>
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="No" checked={allergies === "No"} onChange={e => setAllergies(e.target.value)} disabled={!parent}/>
                    <label class="form-check-label" for="inlineRadio2">No</label>
                </div>
            </div>
            </div>
            </div>
            
            <div className="input-group mb-2">
                <label htmlFor="medicalCondition" className="input-group-text">Medical Condition</label>
                <input type="text" className="form-control col-sm-6" id="medicalCondition" value={medicalCondition} onChange={e => setMedicalCondition(e.target.value)} disabled={!parent} required/>
            </div>
            

            <div className="input-group mb-2">
                <label htmlFor="assignDoctor" className="input-group-text">Assign Doctor</label>
                <select 
                    className="form-select" 
                    id="assignDoctor" 
                    value={assignDoctor} 
                    onChange={e => setAssignDoctor(e.target.value)} disabled={!parent}>
                    <option value="" disabled>Select a doctor</option>
                    {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>{doctor}</option>
                    ))}
                </select>
            </div>
            
            <button type="submit" className="btn vbtn" disabled={!parent}>Register</button>
            
            </div>
            </form>

            </div>
            </div>
            </div>
            
    );
}

export default ChildRegister;
