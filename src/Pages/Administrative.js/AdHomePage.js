import React from 'react';
import StaffHome from '../../Component/StaffHome';
import AdministrativeNav from '../../Component/Nav/AdministrativeNav';

const AdHomePage = () => {
  return (
    <body className='AdminHome' style={{height:'100vh'}}>
    <div>
      <AdministrativeNav/>
      <StaffHome/>
      <h1>Welcome To Administrative Dashboard</h1>
    </div>
    </body>
  );
}

export default AdHomePage;
