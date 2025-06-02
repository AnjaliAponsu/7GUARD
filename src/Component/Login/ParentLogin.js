import {useState } from "react";
import axios from "axios";
import React from "react";
import './LoginFormCSS.css';
import { Link , useNavigate } from "react-router-dom";


const ParentLogin = () =>{
    
    const [parentNic, setParentNic] = useState('');
    const [otp, setOtp] = useState('');
    const [loginCount, setLoginCount] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        if (!parentNic || !otp){
            console.error('NIC and Password Required');
            return;
        }
        try{
            const response = await axios.post('http://localhost:8080/api/v1/loginParent', {parentNic, otp});
console.log(parentNic)
            console.log("Server Response:", response.data);

            if (response.data.success && response.data.loginCount==1) {
                setIsLoggedIn(true);
                alert("Please update your OTP to New Password");
                navigate("/ParentUpdatePassword");
            } else if(response.data.success && response.data.loginCount > 1){
                setIsLoggedIn(true);
                console.log(parentNic)
                navigate(`/home/${parentNic}`)
            }else if (response.data.message === "Login failed. Check your User Name and Password") {
                setError('Login failed. Check your User Name and Password');
                alert("Login failed. Check your User Name and Password");
            } else {
                alert("Login Failed");
            }
      } catch (error) {
          if (error.response) {
              console.error('Error Response:', error.response.data);
              setError('Invalid NIC or Password');
          } else {
              console.error('Error Message:', error.message);
              setError('Network Error');
          }
      }
            
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "white" }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                            <img src='/UserLoginImg.jpg' className="img-fluid" style={{ borderRadius: '1rem', borderColor: 'black' }} />
                            </div>

                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                        <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center mb-3 pb-1">
                            <h1>7Guard</h1>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Login to your account</h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="text" id="form2Example17" className="form-control form-control-lg" placeholder="NIC" value={parentNic} onChange={e => setParentNic(e.target.value)}/>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input type="password" id="form2Example27" className="form-control form-control-lg" placeholder="Password" value={otp} onChange={e => setOtp(e.target.value)}/>
                        </div>

                        <div className="small text-muted" style={{ textAlign: 'right' }}>
                            <Link to={'/ParentUpdatePassword'}>Forgot Password?</Link>
                        </div>

                        <div className="pt-1 mb-4" style={{marginTop:'5%'}}>
                            <button data-mdb-button-init data-mdb-ripple-init className="btn vbtn btn-lg btn-block" type="submit" style={{width:'50%', alignContent: 'right'}}>Login</button>
                        </div>

                        </form>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
);
}

export default ParentLogin;
