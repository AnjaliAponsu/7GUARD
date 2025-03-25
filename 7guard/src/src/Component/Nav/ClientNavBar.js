import React from 'react'
import { Link,useParams } from 'react-router-dom';
import profileIcon from '../Pictures/profile.png';
import "./ClientNavBar.css"

const ClientNavBar = () => {
    const {parentNic} = useParams();
  return (
    <nav className="navbar navbar-expand-lg nav2">
        <div className="container-fluid">
            <a className="navbar-brand">
                7GUARD
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to ={`/home/${parentNic}`}>HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={`/lau/${parentNic}`}>ABOUT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={'/cu'}>CONTACT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={`/lva/${parentNic}`}>VACCINE</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link active" to ={`/ap/${parentNic}`}>APPOINTMENT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={`/FeedbackManager/${parentNic}`}>FEEDBACK</Link>
                    </li>
                    
                </ul>
                
                <form className="d-flex" role="search">
                    <Link className="nav-link" to={`/ParentProfile/${parentNic}`}>
                          <img src={profileIcon} className="profile-icon mx-sm-2" />
                    </Link>
                </form>
                    
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default ClientNavBar;
