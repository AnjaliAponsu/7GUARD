import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import NurseNavBar from "../../../Component/Nav/NurseNavBar";

function NurseCHDR() {
  const navigate = useNavigate();
  const [CHDR_id, setCHDR_id] = useState("");
  const [UserData, setUserData] = useState({
    child_id: "",
    parentNic: "",
    c_fName: "",
    c_lName: "",
    c_dob: "",
    c_gender: "",
    relationshipToGuardian: "",
    c_bloodGroup: "",
    c_allergies: "",
    c_medicalCondition: "",
    assignDoctor: "",
  });
  const [impOfVaccines, setImpOfVaccines] = useState([]);
  const [bmiData, setBmiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chdrValue, setChdrValue] = useState('');
  const [childid, setChildid] = useState('');
  const [values, setValues] = useState([]);

  //----------------------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
      if (name === 'chdrvalue') {
        setChdrValue(value)

      }}
console.log("chdrvalue",chdrValue)

const handleEnter = async (chdrValue) => {
 setCHDR_id(chdrValue);
};

console.log("chdrvalue2",CHDR_id)


useEffect(() => {
  const fetchChdrDetails = async () => {
      try {
          const response = await fetch(`http://localhost:8080/7Guard/Chdr/getChildIdByChildCHDR/${CHDR_id}`);
          if (!response.ok) {
              throw new Error('Failed to fetch chdr data');
          }
          const userData = await response.json();
          setValues(userData);  
      } catch (error) {
          console.error('Error fetching chdr data:', error);
      }
  };

  fetchChdrDetails();
}, [CHDR_id]);



  console.log("child details",values)
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (CHDR_id) {
        loadImpofvaccines();
    } else {
        setError('Invalid CHDR ID');
        setLoading(false);
    }
}, [CHDR_id]);

const loadImpofvaccines = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/iov/chdr/${CHDR_id}`);
        console.log('Vaccines loaded:', response.data);
        setImpOfVaccines(response.data);
    } catch (error) {
        console.error('Error loading vaccine data:', error);
        setError('Failed to load vaccine data. Please try again later.');
    } finally {
        setLoading(false);
    }
};

  //-----------------------------------------------------------------------------
  const handlevaccine = () => {
    navigate("/InjectedVaccine");
               
};
const handlebmi = () => {
  navigate("/BmiForm");
             
};

  return (
    
    <div className="Body1">
      <NurseNavBar/>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow" id="Body2">
        <h1 className="ha4 mb-4"><br/>Child Health Development Record</h1>
        <div className='input-group mb-2' style={{marginTop:'2%' }}>
        <label className='input-group-text'>CHDR ID</label>
        <input className='form-control col-sm-6' name="chdrvalue" value={chdrValue}  onChange={handleChange}></input>
        <button className="btn vbtn" onClick={()=>handleEnter(chdrValue)}>Enter</button>
        </div>
        <form>
        <div>
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="fName" value={values.firstName}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="lName" value={values.lastName}/>
            </div>
            </div>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="dob" value={values.dob}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <input type="text" className="form-control col-sm-6" id="gender"  value={values.gender}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="blood" className="input-group-text">Blood Group</label>
                <input type="text" id="blood" className="form-control col-sm-6" value={values.bloodGroup}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Allergy Reactions</label>
                <input type="text" id="allergy" className="form-control col-sm-6" value={values.allergies}/>
            </div>
            </div>
            </div>
            
            <div className="input-group mb-2">
                <label htmlFor="assignDoctor" className="input-group-text">Assign Doctor</label>
                <input type="text" className="form-control col-sm-6" id="medicalCondition" value={values.assignDoctor}/>
            </div>

            </div>
            </form>

            <br/>
            <br/>
            <div className="border-bottom"></div>
            <br/>
            

        
        <section>
          <h1 className="vhead">Vaccine List</h1>
          <table className="table table-bordered table-hover shadow container">
            <thead>
              <tr className="text-center">
                <th>Vaccine Name</th>
                <th>Scan</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {impOfVaccines.map((impOfVaccine) => (
                <tr key={impOfVaccine.impofid}>
                  <td>{impOfVaccine.impofvaccine_name}</td>
                  <td>
                    {impOfVaccine.scan && impOfVaccine.scan.length > 0
                      ? impOfVaccine.scan.map((scan) => <div key={scan.id}>{scan.scan}</div>)
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <br/>
        <br/>
            <div className="border-bottom"></div>
        <br/>

        <button onClick={handlevaccine} className='btn vbtn mx-sm-3' style={{width:'30vh'}}>Vaccine Scan</button>
        <button onClick={handlebmi} className='btn vbtn' style={{width:'30vh'}}>BMI</button></div>
        <br/><br/>
    </div>
  );
}

export default NurseCHDR;
