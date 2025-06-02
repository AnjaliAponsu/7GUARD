import React from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminNavBar.css"

const AdministrativeNav = () => {
  return (
   
    <nav className="navbar navbar-expand-lg nav1">
        <div className="container-fluid">
        <a className="navbar-brand">
                <Link to={'/adhome'} style={{textDecoration:'none', color:'black'}}>7GUARD</Link>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to ={"/"}></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={"/DoctorDetails"}>DOCTOR</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={"/StaffDetails"}>STAFF</Link>
                    </li>
                   
                </ul>
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default AdministrativeNav;
