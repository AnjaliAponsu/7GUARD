import React from 'react'
import { Link } from 'react-router-dom';

const ClientNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                        <Link className="nav-link active" to={"/Aboutus"}>ABOUT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/viov"}>VACCINE</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/"}>APPOINTMENT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/"}>FEEDBACK</Link>
                    </li>
                </ul>
                
                <form className="d-flex" role="search">
                    <Link to="/" className="btn btn-dark" type="submit">LOGOUT</Link>
                </form>
                    
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default ClientNavBar;
