import React from 'react';
import StaffHome from '../../Component/StaffHome';
import PharmecistNavBar from '../../Component/Nav/PharmecistNavBar';

const PharmecistHomePage = () => {
  return (
    <body className='AdminHome' style={{height:'100vh'}}>
    <div>
      <PharmecistNavBar/>
      <StaffHome/>
      <h1>Welcome Pharmecist Dashboard</h1>
    </div>
    </body>
  );
}

export default PharmecistHomePage;
