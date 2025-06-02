import React from 'react'
import { Link } from 'react-router-dom';
import "./ClientNavBar.css"

const MainNav = () => {
    
  return (
    <nav className="navbar navbar-expand-lg nav3">
        <div className="container-fluid">
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                        <Link className="nav-link active leftside" to ={""} style={{color:'pink'}}>Santa Dora Hospital</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active leftside" to ={""}>|</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active leftside" to ={""}>Mon 8.00a.m-Fri 5.00p.m</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active leftside" to ={""}>|</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active " to ={""}>011-2874874</Link>
                    </li>
                </ul>
                
                <form role="search">
                    <Link to="/" className="btn btn-light text-dark" type="submit">LOGOUT</Link>
                </form>
                    
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default MainNav;
