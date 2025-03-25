import React from 'react';
import StaffHome from '../../Component/StaffHome';
import DoctorNavBar from '../../Component/Nav/DoctorNavBar';

const DoctorHomePage = () => {
  return (
    <body className='AdminHome' style={{height:'100vh'}}>
    <div>
      <DoctorNavBar/>
      <StaffHome/>
      <h1>Welcome Doctor Dashboard</h1>
    </div>
    </body>
  );
}

export default DoctorHomePage;
