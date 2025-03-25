import {useState } from "react";
import axios from "axios";
import React from "react";
import './LoginFormCSS.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const StaffLogin = () =>{
    const [workEmail, setWorkEmail] = useState('');
    const [s_password, setS_password] = useState('');
    const [type, setType] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      if (!workEmail || !s_password){
          console.error('Email and Password Required');
          setError('Email and Password are required.');
          return;
      }
      try{
          const response = await axios.post('http://localhost:8080/api/v1/loginStaff', {workEmail, s_password, type});
  
          console.log("Server Response:", response.data);

          if (response.data.message) {
            
              setType(response.data.type);
              localStorage.setItem("email", response.data.email)
              console.log(type)
              

              const staffType = response.data.type;
              setIsLoggedIn(true);

              if(staffType == 'Nurse'){
                navigate(`/nhome` );
              }

              else if(staffType == 'Receiptionist'){
                navigate(`/rhome` );
              }

              else if(staffType == 'Pharmacist'){
                navigate(`/phome` );
              }


              else{
                alert("Email does not match with any staff member");
              }

          } else {
              alert("Login Failed");
          }
      }

      catch (error){
        if (error.response) {
          console.error('Error Response:', error.response.data);
          setError('Invalid Email or Password');
        } 
        else {
          console.error('Error Message:', error.message);
          setError('Network Error');
      }
      }
          
  };

    return (
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card text-dark" styled="border-radius: 1rem;">
                <div className="card-body p-5 text-center">
      
                  <div className="mb-md-5 mt-md-4 pb-5">
                  <form onSubmit={handleSubmit} >
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-black-50 mb-5">Please enter your Email and Password!</p>
      
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" value={workEmail} onChange={e => setWorkEmail(e.target.value)} />
                      <label className="form-label" for="typeEmailX">Email</label>
                    </div>
      
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" value={s_password} onChange={e => setS_password(e.target.value)}/>
                      <label className="form-label" for="typePasswordX">Password</label>
                    </div>
      
                    <p className="small mb-5 pb-lg-2"><a className="text-black-50"><Link to={'/StaffUpdatePassword'}>Forgot password?</Link></a></p>
      
                    <button data-mdb-button-init data-mdb-ripple-init className="btn vbtn btn-outline-rgb(236, 37, 150) btn-lg px-5" type="submit" >Login</button>
      
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

export default StaffLogin;
