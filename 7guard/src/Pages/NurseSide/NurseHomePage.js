import React from 'react';
import StaffHome from '../../Component/StaffHome';
import NurseNavBar from '../../Component/Nav/NurseNavBar';

const HomePage = () => {
  return (
    <body className='AdminHome' style={{height:'100vh'}}>
    <div>
      <NurseNavBar/>
      <StaffHome/>
      <h1>Welcome To Nurse Dashboard</h1>
    </div>
    </body>
  );
}

export default HomePage;
