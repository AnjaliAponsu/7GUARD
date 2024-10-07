import React from 'react'
import { Link } from 'react-router-dom';

const NurseNavBar = () => {
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
                        <Link className="nav-link active" aria-current="page" to ={"/"}></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to={"/"}>CHDR</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className='nav-link dropdown-toggle'
                           role='button'
                           data-bs-toggle='dropdown'
                           aria-expanded='false'>VACCINE</a>
                           <ul className='dropdown-menu'>
                               <li><Link className='dropdown-item' to={'/vlt'}>CHDR</Link></li>
                               <li><Link className='dropdown-item' to={'/vt'}>Importance</Link></li>
                           </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/"}>REMINDERS</Link>
                    </li>
                   
                    <li className="nav-item">
                        <Link className="nav-link active" to ={"/"}>APPOINTMENT</Link>
                    </li>
                </ul>
                
                <form className="d-flex" role="search">
                    <Link to="/" className="btn btn-light" type="submit">LOGOUT</Link>
                </form>
                    
                
            </div>
            
        </div>
    </nav> 
    
  )
}

export default NurseNavBar;
