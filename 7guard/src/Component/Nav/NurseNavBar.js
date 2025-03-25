import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import profileIcon from '../Pictures/profile.png';
import "./AdminNavBar.css"

const NurseNavBar = () => {
    const {bmiStatus}=useParams();
    const workEmail = localStorage.getItem("email")
    const navigate = useNavigate();

    const handleLogout = () =>{
        
        alert("Logged out successfully");
        localStorage.removeItem("email");
        navigate(`/StaffLogin`)
        
    }
    
  return (
   
    <nav className="navbar navbar-expand-lg nav1">
        <div className="container-fluid">
            <a className="navbar-brand">
                <Link to={`/nhome/${workEmail}`} style={{textDecoration:'none', color:'black'}}>7GUARD</Link>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to ={"/"}></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className='nav-link dropdown-toggle'
                           id='navbarDropdown'
                           role='button'
                           data-bs-toggle='dropdown'
                           aria-expanded='false'>REGISTRATION</a>
                           <ul className='dropdown-menu'>
                               <li><Link className='dropdown-item' to={'/ParentDetails'}>PARENT</Link></li>
                               <li><Link className='dropdown-item' to={'/ChildrenDetails'}>CHILD</Link></li>
                           </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className='nav-link dropdown-toggle'
                           id='navbarDropdown'
                           role='button'
                           data-bs-toggle='dropdown'
                           aria-expanded='false'>VACCINE</a>
                           <ul className='dropdown-menu'>
                               <li><Link className='dropdown-item' to={'/vlt'}>LIST</Link></li>
                               <li><Link className='dropdown-item' to={'/vt'}>IMPORTANCE</Link></li>
                           </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/InjectedVaccineTable"}>INJECTED VACCINE</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/NurseCHDR"}>CHDR</Link>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link active" to ={`/VaccineReminder`}>REMINDER</Link>
                    </li>
                    
                </ul>

                <form className="d-flex" role="search">
                    <Link className="nav-link" to={`/StaffProfile/${workEmail}`}>
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

export default NurseNavBar;
