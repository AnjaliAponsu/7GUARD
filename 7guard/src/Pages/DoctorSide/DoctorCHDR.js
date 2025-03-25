import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Line } from "react-chartjs-2";
import { useParams, useNavigate } from "react-router-dom";
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
import DoctorNavBar from "../../Component/Nav/DoctorNavBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FETCH_API_URL = "http://localhost:8080/api/bmi/byChdrId";

function DoctorCHDR() {
  const navigate = useNavigate();
  const [CHDR_id, setCHDR_id] = useState("");
  const [impOfVaccines, setImpOfVaccines] = useState([]);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [chdrValue, setChdrValue] = useState("");
  const [values, setValues] = useState({});
  const [bmiData, setBmiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //----------------------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "chdrvalue") {
      setChdrValue(value);
    }
  };

  const handleEnter = (chdrValue) => {
    setCHDR_id(chdrValue);
  };

  useEffect(() => {
    const fetchChdrDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/7Guard/Chdr/getChildIdByChildCHDR/${CHDR_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch CHDR data");
        }
        const userData = await response.json();
        setValues(userData);
      } catch (error) {
        console.error("Error fetching CHDR data:", error);
      }
    };

    if (CHDR_id) fetchChdrDetails();
  }, [CHDR_id]);

  useEffect(() => {
    if (CHDR_id) {
      loadImpOfVaccines();
      fetchBmiDataByChdrId();
    } else {
      setError("Invalid CHDR ID");
      setLoading(false);
    }
  }, [CHDR_id]);

  const loadImpOfVaccines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/iov/chdr/${CHDR_id}`
      );
      setImpOfVaccines(response.data);
    } catch (error) {
      console.error("Error loading vaccine data:", error);
      setError("Failed to load vaccine data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

  const handlePrescription = () => {
    navigate("/Prescription");
  };

  return (
    <div className="Body1">
      <DoctorNavBar/>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow" id="Body2">
        <h1 className="ha4">Child Health Development Record</h1>
        <div className="input-group mb-2" style={{ marginTop: "2%" }}>
          <label className="input-group-text">CHDR ID</label>
          <input
            className="form-control col-sm-6"
            name="chdrvalue"
            value={chdrValue}
            onChange={handleChange}
          />
          <button onClick={() => handleEnter(chdrValue)} className="btn vbtn">Enter</button>
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
                      ? impOfVaccine.scan.map((scan) => (
                          <div key={scan.id}>{scan.scan}</div>
                        ))
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

        {graphLoaded && bmiData.length > 0 && (
          <div>
            <h1 className="vhead">BMI Graph</h1>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button
          className="btn vbtn"
          style={{ marginLeft: "88%", marginTop: "2%" }}
          onClick={handlePrescription}
        >
          Prescription
        </button>
      </div>
      </div>
);
}
export default DoctorCHDR;
        