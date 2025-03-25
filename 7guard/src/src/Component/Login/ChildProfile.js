import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './RegistrationFormCSS.css';
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FETCH_API_URL = 'http://localhost:8080/api/bmi/byChdrId';

function ChildProfile() {
  const { child_id } = useParams();
  const [CHDR_id, setCHDR_id] = useState("");
  const [UserData, setUserData] = useState({
    child_id: '',
    chdrId: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    medicalCondition: '',
    assignDoctor: ''
  });
  const [impOfVaccines, setImpOfVaccines] = useState([]);
  const [bmiData, setBmiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (child_id) {
      fetchChildById();
      fetchCHDRDetails();
    }
  }, [child_id]);

  useEffect(() => {
    if (CHDR_id) {
      fetchBmiDataByChdrId();
    }
  }, [CHDR_id]); 

  const fetchChildById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/7Guard/Chdr/getChildByChildId/${child_id}`
      );
      if (response?.data) {
        setUserData(response.data);
      } else {
        console.error("Child not found:", response.data?.message || "No details.");
        alert("Child not found. Please check the ID and try again.");
      }
    } catch (error) {
      console.error("Error fetching child data:", error);
      alert("An error occurred while fetching the child data. Please try again later.");
    }
  };

  const fetchCHDRDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/7Guard/Chdr/getChildByChildCHDR/${child_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch CHDR data");
      }
      const userData = await response.json();
      setCHDR_id(userData.chdrId);
    } catch (error) {
      console.error("Error fetching CHDR data:", error);
    }
  };

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

  const fetchBmiDataByChdrId = async () => {
    try {
      setErrorMessage("");
      const response = await fetch(`${FETCH_API_URL}?chdrId=${CHDR_id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch BMI data: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage(`No data found for CHDR ID: ${CHDR_id}`);
        setBmiData([]);
      } else {
        setBmiData(data);
        setGraphLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching BMI data:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  const chartData = {
    labels: bmiData.map((record) => record.childWeight),
    datasets: [
      {
        label: `BMI Data for CHDR ID: ${CHDR_id}`,
        data: bmiData.map((record) => ({
          x: record.childWeight,
          y: record.childHeight,
          date: record.date,
          bmi: parseFloat(record.bmiValue).toFixed(2),
          bmiStatus: record.bmiStatus,
        })),
        borderColor: "rgba(255, 105, 180, 1)",
        borderWidth: 1.5,
        tension: 0.2,
        pointBackgroundColor: bmiData.map((record) => {
          if (record.bmiStatus === "Underweight") return "blue";
          if (record.bmiStatus === "Normal") return "green";
          if (record.bmiStatus === "Overweight") return "orange";
          if (record.bmiStatus === "Obese") return "red";
          if (record.bmiStatus === "Severely Underweight") return "white";
          return "black";
        }),
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: function(){
            return '';
          },
          label: function (context) {
            const { x, y, date, bmi, bmiStatus } = context.raw;
            return [
              `Date: ${date}`,
              `BMI: ${bmi}`,
              `Status: ${bmiStatus}`,
              `Weight: ${x} kg`,
              `Height: ${y} m`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Height (m)",
        },
      },
    },
  };

  return (
    <div className="Body1">
      <div className="col-sm-8 py-2 px-5 offset-2 shadow" id="Body2">
        <h1 className="vhead"><br/>Child Health Development Record</h1><br/>
        {/* Form Section */}
        <form>
        <div>

            <div class="row">
            <div className="input-group mb-2">
                <label htmlFor="fName" className="input-group-text">CHDR ID</label>
                <input type="text" className="form-control col-sm-6" id="fName" value={UserData.chdrId}/>
            </div>
            </div>

        
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="fName" className="input-group-text">First Name</label>
                <input type="text" className="form-control col-sm-6" id="fName" value={UserData.firstName}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="lName" className="input-group-text">Last Name</label>
                <input type="text" className="form-control col-sm-6" id="lName" value={UserData.lastName}/>
            </div>
            </div>
            </div>
            
            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="dob" className="input-group-text">Date of Birth</label>
                <input type="date" className="form-control col-sm-6" id="dob" value={UserData.dob}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="gender" className="input-group-text">Gender</label>
                <input type="text" className="form-control col-sm-6" id="gender"  value={UserData.gender}/>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="blood" className="input-group-text">Blood Group</label>
                <input type="text" id="blood" className="form-control col-sm-6" value={UserData.bloodGroup}/>
            </div>
            </div>

            <div class="col">
            <div className="input-group mb-2">
                <label htmlFor="address" className="input-group-text">Allergy Reactions</label>
                <input type="text" id="allergy" className="form-control col-sm-6" value={UserData.allergies}/>
            </div>
            </div>
            </div>
            
            <div className="input-group mb-2">
                <label htmlFor="medicalCondition" className="input-group-text">Medical Condition</label>
                <input type="text" className="form-control col-sm-6" id="medicalCondition" value={UserData.medicalCondition}/>
            </div>
            

            <div className="input-group mb-2">
                <label htmlFor="assignDoctor" className="input-group-text">Assign Doctor</label>
                <input type="text" className="form-control col-sm-6" id="medicalCondition" value={UserData.assignDoctor}/>
            </div>

            </div>
            </form>

            <br/>
            <br/>
            <div className="border-bottom"></div>
            <br/>


        {/* Vaccine List */}
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

        
        {graphLoaded && (
          <div>
            <h1 className="vhead">BMI Graph</h1>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

       
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default ChildProfile;
