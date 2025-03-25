import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../Pictures/profile.png';
import "./AdminNavBar.css"

const DoctorNavBar = () => {
        const navigate = useNavigate();
        const doctorWorkEmail = localStorage.getItem("email")
    
        const handleLogout = () =>{
            
            alert("Logged out successfully");
            localStorage.removeItem("email");
            navigate(`/StaffLogin`)
        }
  return (
   
    <nav className="navbar navbar-expand-lg nav1">
        <div className="container-fluid">
        <a className="navbar-brand">
                <Link to={`/dhome/${doctorWorkEmail}`} style={{textDecoration:'none', color:'black'}}>7GUARD</Link>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/DoctorCHDR"}>CHDR</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/PrescriptionTable"}>PRESCRIPTION</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/admin"}>SIDE EFFECT</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/advice"}>BMI ADVICE</Link>
                    </li>
                </ul>

                <form className="d-flex" role="search">
                    <Link className="nav-link" to={`/DoctorProfile/${doctorWorkEmail}`}>
                          <img src={profileIcon} className="profile-icon mx-sm-2" />
                    </Link>
                </form>
                
                <form className="d-flex">
                <button className='btn text-light btn-danger ' type="submit" onClick={handleLogout}>LOGOUT</button>
                </form>
                    
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default DoctorNavBar;
