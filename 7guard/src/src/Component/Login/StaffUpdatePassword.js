import {useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const StaffUpdatePassword = () =>{
    
    
    const [workEmail, setWorkEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate;


    
    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        if (!workEmail){
            console.error('Email Required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Confirm password does not match the new password.');
            alert('Confirm password does not match the new password.');
            return;
        }
        
        try{
            const response = await axios.put('http://localhost:8080/api/v1/staffUpdatePassword', {workEmail, newPassword, confirmPassword});

            console.log("Server Response:", response.data);

            if (response.data && response.data.message === 'Password updated successfully. Please use the new password to log in.') {
                alert('Password updated successfully');
                navigate('/StaffLogin');
            } else {
                setError(response.data.message || 'Unexpected error occurred.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
                setError(error.response.data.message || 'Invalid NIC or Password.');
            } else {
                console.error('Error Message:', error.message);
                setError('Network Error. Please try again.');
            }
        }
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
        <form className="form-inline" onSubmit={handleSubmit}>
            <h2 className="vhead">Forgot Password</h2>
            <div class="form-group row mb-2">
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"  value={workEmail} onChange={e => setWorkEmail(e.target.value)}/>
            </div>

            <div class="form-group row mb-2">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </div>

            <div class="form-group row mb-2">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </div>

            <button type="submit" class="btn vbtn">Update</button>
        </form>
        </div>
        </div>
        </div>
);
}

export default StaffUpdatePassword;
