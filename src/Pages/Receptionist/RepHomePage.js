import React from 'react';
import StaffHome from '../../Component/StaffHome';
import ReceptionistNavBar from '../../Component/Nav/ReceptionistNavBar';

const HomePage = () => {
  return (
    <body className='AdminHome' style={{height:'100vh'}}>
    <div>
      <div>
      <ReceptionistNavBar/>
      <StaffHome/>
      <h1>Welcome To Receptionist Dashboard</h1>
    </div>
    </div>
    </body>
  );
}

export default HomePage;
