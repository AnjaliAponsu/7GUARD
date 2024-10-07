import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import Aboutus from './Pages/ClientSide/AboutUs/Aboutus';

import AddImpOfVaccine from './Pages/NurseSide/ImpOfVaccine/AddImpOfVaccine';
import VaccineTable from './Pages/NurseSide/ImpOfVaccine/VaccineTable';
import UpdateImpOfVaccine from './Pages/NurseSide/ImpOfVaccine/UpdateImpOfVaccine';
import ViewImpOfVaccine from  './Pages/NurseSide/ImpOfVaccine/ViewImpOfVaccine'; 
import VaccineListTable from './Pages/NurseSide/CHDR/VaccineList/VaccineListTable';
import ViewVaccineList from './Pages/NurseSide/CHDR/VaccineList/ViewVaccineList';
import AddVaccineList from './Pages/NurseSide/CHDR/VaccineList/AddVaccineList';

import VaccineStockTable from './Pages/Pharmecist/VaccineStock/VaccineStockTable';
import AddVaccineStock from './Pages/Pharmecist/VaccineStock/AddVaccineStock';
import VaccineStockList from './Pages/Pharmecist/VaccineStockList/VaccineStockList';
import AddVaccinesToStock from './Pages/Pharmecist/VaccineStockList/AddVaccinesToStock';

function App() {
  return (
    <div className="App">
      
      

      <Router>
        <Routes>
          <Route exact path="/au" element={<Aboutus/>}></Route>
          
          <Route exact path="/vt" element={<VaccineTable/>}></Route>
          <Route exact path="/aiov" element={<AddImpOfVaccine/>}></Route>
          <Route path="/uiov/:impofid" element={<UpdateImpOfVaccine />}></Route>
          <Route exact path="/viov" element={<ViewImpOfVaccine/>}></Route>

          <Route exact path="/vlt" element={<VaccineListTable/>}></Route>
          <Route exact path="/vvl" element={<ViewVaccineList/>}></Route>
          <Route exact path="/avl" element={<AddVaccineList/>}></Route>
          
          <Route exact path="/vst" element={<VaccineStockTable/>}></Route>
          <Route exact path='/avs' element={<AddVaccineStock/>}></Route>
          <Route exact path='/vsl' element={<VaccineStockList/>}></Route>
          <Route exact path='/avts' element={<AddVaccinesToStock/>}></Route>
        
        </Routes>
      </Router>

    
    </div>
  );
}

export default App;
