import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//icon
import '@fortawesome/fontawesome-free/css/all.min.css';

//Anjali
//client main page
import MainHomePage from './Pages/ClientSide/Homepage/MainHomePage';
import Home from './Pages/ClientSide/Homepage/Home';
import MainAboutUs from './Pages/ClientSide/AboutUs/MainAboutUs';
import LoginAboutUs from './Pages/ClientSide/AboutUs/LoginAboutUs';
import MainViewVaccine from './Pages/ClientSide/ImpOfVaccine/MainViewVaccine';
import LoginVaccine from './Pages/ClientSide/ImpOfVaccine/LoginVaccine';
import Chdr from "./Pages/ClientSide/Profile/Chdr";
import NurseHomePage from './Pages/NurseSide/NurseHomePage';
import PharmecistHomePage from './Pages/Pharmecist/PharmecistHomePage';
import RepHomePage from './Pages/Receptionist/RepHomePage';
import DoctorHomePage from './Pages/DoctorSide/DoctorHomePage';
import AdHomePage from './Pages/Administrative.js/AdHomePage';
import Appointment from './Pages/ClientSide/Appointment/Appointment';
import MainAppointment from './Pages/ClientSide/Appointment/MainAppointment';
import MainContact from './Pages/ClientSide/Contact/MainContact';
import Contact from './Pages/ClientSide/Contact/Contact';

//Importance of vaccines and vaccine list
import AddImpOfVaccine from './Pages/NurseSide/ImpOfVaccine/AddImpOfVaccine';
import VaccineTable from './Pages/NurseSide/ImpOfVaccine/VaccineTable';
import UpdateImpOfVaccine from './Pages/NurseSide/ImpOfVaccine/UpdateImpOfVaccine';
import VaccineListTable from './Pages/NurseSide/CHDR/VaccineList/VaccineListTable';
import ViewVaccineList from './Pages/NurseSide/CHDR/VaccineList/ViewVaccineList';
import AddVaccineList from './Pages/NurseSide/CHDR/VaccineList/AddVaccineList';
//Vaccine stock
import VaccineStockTable from './Pages/Pharmecist/VaccineStock/VaccineStockTable';
import AddVaccineStock from './Pages/Pharmecist/VaccineStock/AddVaccineStock';
import VaccineStockList from './Pages/Pharmecist/VaccineStockList/VaccineStockList';

//Dewindi
import StaffRegister from "./Component/Login/StaffRegister";
import ParentRegister from "./Component/Login/ParentRegister";
import DoctorRegister from "./Component/Login/DoctorRegister";
import DoctorLogin from "./Component/Login/DoctorLogin";
import StaffLogin from "./Component/Login/StaffLogin";
import ParentDetails from "./Component/Login/ParentDetails";
import ChildRegister from "./Component/Login/ChildRegister";
import ParentLogin from "./Component/Login/ParentLogin";
import ParentUpdatePassword from "./Component/Login/ParentUpdatePassword";
import UpdateParent from "./Component/Login/UpdateParent";
import UpdateDoctor from "./Component/Login/UpdateDoctor";
import UpdateStaff from "./Component/Login/UpdateStaff";
import DoctorProfile from "./Component/Login/DoctorProfile";
import StaffProfile from "./Component/Login/StaffProfile";
import ParentProfile from "./Component/Login/ParentProfile";
import UpdateChild from "./Component/Login/UpdateChild";
import ChildProfile from "./Component/Login/ChildProfile";
import DoctorUpdatePassword from "./Component/Login/DoctorUpdatePassword";
import StaffUpdatePassword from "./Component/Login/StaffUpdatePassword";
import ChildrenDetails from "./Component/Login/ChildrenDetails";
import StaffDetails from "./Component/Login/StaffDetails";
import DoctorDetails from "./Component/Login/DoctorDetails";

//Amada
import ChannelingSuccess from "./Pages/Receptionist/Channeling/ChannelingSuccess";
import ChannelingToken from "./Pages/Receptionist/Channeling/ChannelingToken";
import EditVaccineChanneling from "./Pages/Receptionist/Channeling/EditVaccineChanneling";  
import AdminChannelingManage from "./Pages/Receptionist/Channeling/AdminChannelingManage";
import PlaceVaccineChanneling from "./Pages/Receptionist/Channeling/PlaceVaccineChannelings";
import AdminChannelingEdit from "./Pages/Receptionist/Channeling/AdminChannelingEdit";
import AdminBillToken from "./Pages/Receptionist/Channeling/AdminBillToken";
import AdminChannelingToken from "./Pages/Receptionist/Channeling/AdminChannelingToken";
import NurseCHDR from './Pages/NurseSide/CHDR/NurseCHDR';
import DoctorCHDR from './Pages/DoctorSide/DoctorCHDR';

//Pathum
import VaccineReminder from "./Pages/Administrative.js/Reminder/VaccineReminder" ;

//Nethmi
import AppointmentForm from './Component/Appointment/AppointmentForm';
import AppointmentTable from './Component/Appointment/AppointmentTable';
import EditAppointments from './Component/Appointment/EditAppointments';
import AppointmentSuccess from './Component/Appointment/AppointmentSuccess';

//Lihini
import Prescription from './Pages/DoctorSide/Prescription/Prescription';
import PrescriptionEdit from './Component/Prescription/PrescriptionEdit';
import PrescriptionSuccess from './Component/Prescription/PrescriptionSuccess';
import PrescriptionDone from './Component/Prescription/PrescriptionDone';
import PrescriptionTable from './Component/Prescription/PrescriptionTable';
import Injectvaccine from './Pages/InjectedVaccine/Injectvaccine';
import InjectedVaccineTable from './Component/InjectedVaccine/InjectedVaccineTable';

//Hasmini
import SideEffectToken from './Component/InjectedVaccine/SideEffectToken';
import AdminPage from './Pages/DoctorSide/SideEffect/AdminPage';
import UpdateSideEffect from './Pages/DoctorSide/SideEffect/UpdateSideEffect';

//Rasuni
import BmiForm from './Pages/ClientSide/BMI/BmiForm'; 

//Dinusha
import FeedbackManager from './Pages/ClientSide/Feedback/FeedbackManager';
import AdminFeedback from './Pages/Receptionist/Feedback/AdminFeedback';

//Chathum
import AdviceTable from "./Pages/NurseSide/Advice/AdviceTable";
import AddAdviceForm from "./Pages/NurseSide/Advice/AddAdviceForm";
import UpdateAdviceForm from "./Pages/NurseSide/Advice/UpdateAdviceForm";
import SendAdviceForm from "./Pages/NurseSide/Advice/SendAdviceForm";







function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={<MainHomePage/>}></Route>
          <Route exact path="/home/:parentNic" element={<Home/>}></Route>
          <Route exact path="/nhome" element={<NurseHomePage/>}></Route>
          <Route exact path="/phome" element={<PharmecistHomePage/>}></Route>
          <Route exact path="/rhome" element={<RepHomePage/>}></Route>
          <Route exact path="/dhome" element={<DoctorHomePage/>}></Route>
          <Route exact path="/adhome" element={<AdHomePage/>}></Route>

          <Route exact path="/mau" element={<MainAboutUs/>}></Route>
          <Route exact path="/lau/:parentNic" element={<LoginAboutUs/>}></Route>
          <Route exact path="/mvv" element={<MainViewVaccine/>}></Route>
          <Route exact path="/lva/:parentNic" element={<LoginVaccine/>}></Route>
          <Route exact path="/chdr/:CHDR_id" element={<Chdr/>}></Route>
          <Route exact path="/vt" element={<VaccineTable/>}></Route>
          <Route exact path="/aiov" element={<AddImpOfVaccine/>}></Route>
          <Route exact path="/uiov/:impofid" element={<UpdateImpOfVaccine />}></Route>
          <Route exact path="/ap/:parentNic" element={<Appointment />}></Route>
          <Route exact path="/map/:parentNic" element={<MainAppointment/>}></Route>
          <Route exact path="/cu/:parentNic" element={<Contact />}></Route>
          <Route exact path="/mcu" element={<MainContact/>}></Route>
          
          
          <Route exact path="/vlt" element={<VaccineListTable/>}></Route>
          <Route exact path="/vvl" element={<ViewVaccineList/>}></Route>
          <Route exact path="/avl" element={<AddVaccineList/>}></Route>
          <Route exact path="/vst" element={<VaccineStockTable/>}></Route>
          <Route exact path='/avs' element={<AddVaccineStock/>}></Route>
          <Route exact path='/vsl' element={<VaccineStockList/>}></Route>   

          <Route path="/StaffRegister" element={<StaffRegister/>}></Route>
          <Route path="/ParentRegister" element={<ParentRegister/>}></Route>
          <Route path="/DoctorRegister" element={<DoctorRegister/>}></Route>
          <Route path="/ChildRegister" element={<ChildRegister/>}></Route>
          <Route path="/DoctorLogin" element={<DoctorLogin/>}></Route>
          <Route path="/StaffLogin" element={<StaffLogin/>}></Route>
          <Route path="/ParentLogin" element={<ParentLogin/>}></Route>
          <Route path="/ParentDetails" element={<ParentDetails/>}></Route>
          <Route path="/ParentUpdatePassword" element={<ParentUpdatePassword/>}></Route>
          <Route path="/UpdateParent/:parentNic" element={<UpdateParent/>}></Route>
          <Route path="/UpdateDoctor/:d_id" element={<UpdateDoctor/>}></Route>
          <Route path="/UpdateStaff/:s_id" element={<UpdateStaff/>}></Route>
          <Route path="/DoctorProfile/:doctorWorkEmail" element={<DoctorProfile/>}></Route>
          <Route path="/StaffProfile/:workEmail" element={<StaffProfile/>}></Route>
          <Route path="/ParentProfile/:parentNic" element={<ParentProfile/>}></Route>
          <Route path="/UpdateChild/:child_id" element={<UpdateChild/>}></Route>
          <Route path="/ChildProfile/:child_id" element={<ChildProfile/>}></Route>
          <Route path="/DoctorUpdatePassword" element={<DoctorUpdatePassword/>}></Route>
          <Route path="/StaffUpdatePassword" element={<StaffUpdatePassword/>}></Route>
          <Route path="/ChildrenDetails" element={<ChildrenDetails/>}></Route>
          <Route path="/StaffDetails" element={<StaffDetails/>}></Route>
          <Route path="/DoctorDetails" element={<DoctorDetails/>}></Route>

          <Route path="/PlaceVaccineChanneling/:parentNic" element={<PlaceVaccineChanneling/>} />
          <Route path="/Channeling_Success/:parentNic" element={<ChannelingSuccess/>} />
          <Route path="/EditVaccineChanneling/:channelingID" element={<EditVaccineChanneling/>} />
          <Route path="/AdminChannelingEdit/:channelingID" element={<AdminChannelingEdit/>} />
          <Route path="/ChannelingToken/:channelingID/:parentNic" element={<ChannelingToken/>} />
          <Route path="/AdminChannelingManage" element={<AdminChannelingManage/>} />
          <Route path="/AdminBillToken/:channelingID" element={<AdminBillToken/>} />
          <Route path="/AdminChannelingToken/:channelingID/:parentNic" element={<AdminChannelingToken/>} />
          <Route path="/NurseCHDR" element={<NurseCHDR/>} />
          <Route path="/DoctorCHDR" element={<DoctorCHDR/>} />


          <Route path="/VaccineReminder" element={<VaccineReminder/>} />

          <Route path="/a" element={<AppointmentForm/>} />
          <Route path="/appointments" element={<AppointmentTable/>} />
          <Route path="/edit-appointments/:appointmentId/:id" element={<EditAppointments/>}  />
          <Route path="/AppointmentSuccess/:doctorId" element={<AppointmentSuccess/>} />

          <Route path="/Prescription" element={<Prescription/>}/>
          <Route path="/PrescriptionSuccess/:channelingId" element={<PrescriptionSuccess/>}></Route>
          <Route path="/PrescriptionEdit/:channelingID" element={<PrescriptionEdit/>}></Route>
          <Route path="/PrescriptionDone/:channelingID/:email" element={<PrescriptionDone/>}></Route>
          <Route path="/PrescriptionTable" element={<PrescriptionTable/>}></Route>
          <Route path="/InjectedVaccine" element={<Injectvaccine/>}/>
          <Route path="/InjectedVaccineTable" element={<InjectedVaccineTable/>}/>

          <Route path="/SideEffectToken/:vaccineName/:email" element={<SideEffectToken/>}/>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/UpdateSideEffect/:vaccineName" element={<UpdateSideEffect />} />

          <Route path="/BmiForm/:chdrValue/:email" element={<BmiForm/>} />

          <Route path="/FeedbackManager/:parentNic" element={<FeedbackManager/>} />
          <Route path="/AdminFeedback" element={<AdminFeedback/>} />

          <Route path="/advice" element={<AdviceTable />} />
          <Route path="/add" element={<AddAdviceForm />} />
          <Route path="/UpdateAdviceForm/:id" element={<UpdateAdviceForm/>}></Route>
          <Route path="/SendAdviceForm/:email/:status" element={<SendAdviceForm/>}></Route>
      
        
        </Routes>
      </Router>

    
    </div>
  );
}

export default App;
