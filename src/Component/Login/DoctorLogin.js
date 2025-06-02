import {useState } from "react";
import axios from "axios";
import React from "react";
import './LoginFormCSS.css';
import { Link, useNavigate } from "react-router-dom";


const DoctorLogin = () =>{
    const [doctorWorkEmail, setDoctorWorkEmail] = useState('');
    const [d_password, setD_password] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        if (!doctorWorkEmail || !d_password){
            console.error('Email and Password Required');
            return;
        }
        try{
            const response = await axios.post('http://localhost:8080/api/v1/loginDoctor', {doctorWorkEmail, d_password});

            console.log("Server Response:", response.data);

            if (response.data.success) {
              setIsLoggedIn(true);
              localStorage.setItem("email", response.data.email)
              navigate(`/dhome` );
              
          } else if (response.data.message === "Doctor not found") {
              setError('Doctor not found');
              alert("Doctor not found");
          } else {
              alert("Login Failed");
          }
      } catch (error) {
          if (error.response) {
              console.error('Error Response:', error.response.data);
              setError('Invalid Email or Password');
          } else {
              console.error('Error Message:', error.message);
              setError('Network Error');
          }
      }
            
    };

    return (
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card text-dark" styled="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
      
                  <div class="mb-md-5 mt-md-4 pb-5">
                  <form onSubmit={handleSubmit} >
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-black-50 mb-5">Please enter your Email and Password!</p>
      
                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" class="form-control form-control-lg" value={doctorWorkEmail} onChange={e => setDoctorWorkEmail(e.target.value)} />
                      <label class="form-label" for="typeEmailX">Email</label>
                    </div>
      
                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" class="form-control form-control-lg" value={d_password} onChange={e => setD_password(e.target.value)}/>
                      <label class="form-label" for="typePasswordX">Password</label>
                    </div>
      
                    <p class="small mb-5 pb-lg-2"><a class="text-black-50" href="#!"><Link to={'/DoctorUpdatePassword'}>Forgot password?</Link></a></p>
      
                    <button data-mdb-button-init data-mdb-ripple-init class="btn vbtn btn-outline-rgb(236, 37, 150) btn-lg px-5" type="submit" >Login</button>
      
                </form>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>  
    );
}

export default DoctorLogin;
