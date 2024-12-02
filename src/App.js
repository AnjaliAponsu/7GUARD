import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppChannelingSuccess from "./Webpages/ChannelingSuccess";
import AppChannelingToken from "./Webpages/ChannelingToken";
import AppEditVaccineChanneling from "./Webpages/EditVaccineChanneling";  
import AppHome from "./Webpages/Home";
import AppAdminChannelingManage from "./Webpages/AdminChannelingManage";
import AppPlaceVaccineChanneling from "./Webpages/PlaceVaccineChannelings";
import AppAdminChannelingEdit from "./Webpages/AdminChannelingEdit";
import AppAdminBillToken from "./Webpages/AdminBillToken";
import AppAdminChannelingToken from "./Webpages/AdminChannelingToken";

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<AppHome/>} />
          <Route path="/PlaceVaccineChanneling" element={<AppPlaceVaccineChanneling/>} />
          <Route path="/Channeling_Success/:userID" element={<AppChannelingSuccess/>} />
          <Route path="/EditVaccineChanneling/:channelingID" element={<AppEditVaccineChanneling/>} />
          <Route path="/AdminChannelingEdit/:channelingID" element={<AppAdminChannelingEdit/>} />
          <Route path="/ChannelingToken/:channelingID/:userID" element={<AppChannelingToken/>} />
          <Route path="/AdminChannelingManage" element={<AppAdminChannelingManage/>} />
          <Route path="/AdminBillToken/:channelingID" element={<AppAdminBillToken/>} />
          <Route path="/AdminChannelingToken/:channelingID/:userID" element={<AppAdminChannelingToken/>} />
        </Routes>
     
    </Router>
  );
}

export default App;
