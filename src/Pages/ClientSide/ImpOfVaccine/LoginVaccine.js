import React from 'react';
import MainNav from '../../../Component/Nav/MainNav';
import ClientNavBar from '../../../Component/Nav/ClientNavBar';
import ViewImpOfVaccine from '../../NurseSide/ImpOfVaccine/ViewImpOfVaccine';

const LoginVaccine = () => {
  return (
    <div>
        <MainNav/>
        <ClientNavBar/>
        <ViewImpOfVaccine/>
      
    </div>
  );
}

export default LoginVaccine;
