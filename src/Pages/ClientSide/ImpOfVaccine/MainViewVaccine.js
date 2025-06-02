import React from 'react';
import MainNavBar from '../../../Component/Nav/MainNavBar';
import MainClientNav from '../../../Component/Nav/MainClientNav';
import ViewImpOfVaccine from '../../NurseSide/ImpOfVaccine/ViewImpOfVaccine';

const MainViewVaccine = () => {
  return (
    <div>
        <MainNavBar/>
        <MainClientNav/>
        <ViewImpOfVaccine/>
    </div>
  );
}

export default MainViewVaccine;
