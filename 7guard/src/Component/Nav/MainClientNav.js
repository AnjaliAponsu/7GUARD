import React from 'react'
import { Link,useParams } from 'react-router-dom';
import profileIcon from '../Pictures/profile.png';
import "./ClientNavBar.css"

const MainClientNav = () => {
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
                        <Link className="nav-link active" aria-current="page" to ={"/"}>HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={"/mau"}>ABOUT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={'/mcu'}>CONTACT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/mvv"}>VACCINE</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link active" to ={`/map/${parentNic}`}>APPOINTMENT</Link>
                    </li>
                    
                </ul>
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default MainClientNav;
