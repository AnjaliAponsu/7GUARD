import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Bmi.css';
import { useNavigate, useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = 'http://localhost:8080/api/bmi'; 
const FETCH_API_URL = 'http://localhost:8080/api/bmi/byChdrId'; 

const BmiForm = () => {
  const { chdrValue,email } = useParams();
  const navigate =useNavigate();
  const [chdrId, setChdrId] = useState('');
  const [childWeight, setChildWeight] = useState('');
  const [childHeight, setChildHeight] = useState('');
  const [date, setDate] = useState('');
  const [bmiData, setBmiData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const chartRef = useRef(null);
  const [status,setStatus]=useState('');

  useEffect(() => {
    if (chdrValue) {
      setChdrId(chdrValue);
      fetchBmiDataByChdrId(chdrValue); // Automatically fetch BMI data
    }
  }, [chdrValue]);

  const fetchBmiDataByChdrId = async (chdrIdToFetch) => {
    try {
      const response = await fetch(`${FETCH_API_URL}?chdrId=${chdrIdToFetch}`);
      if (!response.ok) throw new Error('Failed to fetch BMI data');

      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage(`No data found for CHDR ID: ${chdrIdToFetch}`);
        setBmiData([]);
      } else {
        setErrorMessage('');
        setBmiData(data);
      }
    } catch (error) {
      setErrorMessage('Error loading BMI data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(childWeight) || isNaN(childHeight) || childWeight <= 0 || childHeight <= 0) {
      setErrorMessage('Enter valid values.');
      return;
    }

    const bmiRecord = {
      chdrId: parseInt(chdrId.trim(), 10),
      childWeight: parseFloat(childWeight),
      childHeight: parseFloat(childHeight),
      date: date,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bmiRecord),
      });

      if (response.ok) {
        setSuccessMessage('BMI record added successfully!');
        setChildWeight('');
        setChildHeight('');
        setDate('');
        fetchBmiDataByChdrId(chdrId); // Refresh BMI data
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add BMI record');
      }
    } catch (error) {
      setErrorMessage('Failed to add BMI record.');
    }
  };

  const chartData = {
    labels: bmiData.map(record => record.childWeight),
    datasets: [
      {
        label: `BMI Data for CHDR ID: ${chdrId}`,
        data: bmiData.map(record => ({
          x: record.childWeight,
          y: record.childHeight,
          date: record.date,
          bmi: parseFloat(record.bmiValue.toFixed(2)),
          bmiStatus: record.bmiStatus,
        })),
        borderColor: 'rgba(255, 105, 180, 1)',
        borderWidth: 1.5,
        fill: false,
        tension: 0.2,
        pointBackgroundColor: bmiData.map(record => {
          if (record.bmiStatus === 'Underweight') return 'blue';
          if (record.bmiStatus === 'Normal') return 'green';
          if (record.bmiStatus === 'Overweight') return 'orange';
          if (record.bmiStatus === 'Obese') return 'red';
          if (record.bmiStatus === 'Severely Underweight') return 'white';
          return 'black';
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
        position: 'top',
      },
      tooltip: {
        callbacks: {
          title: function () {
            return '';
          },
          label: function (context) {
            const { x, y, date, bmi, bmiStatus } = context.raw;
            setStatus(bmiStatus)
            return [
              `Date: ${date}`,
              `BMI: ${parseFloat(bmi).toFixed(2)}`,
              `Status: ${bmiStatus}`,
              `Weight: ${x} kg`,
              `Height: ${y} m`,
            ];
          },
        },
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weight (kg)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Height (m)',
        },
      },
    },
  };
  console.log(status)
  const handleAdvices = () => {
    navigate(`/SendAdviceForm/${email}/${status}`);
  };
  return (
    <div className="Body1">
      <div className="col-sm-8 py-2 px-5 shadow container" id="Body2">
        <h1 className="ha4">BMI Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-group mb-2">
              <label htmlFor="chdrId" className="input-group-text">CHDR ID</label>
              <input type="text" className="form-control col-sm-6" id="chdrId" value={chdrId} readOnly required/>
            </div>

            <div className="row">
              <div className="col">
                <div className="input-group mb-2">
                  <label htmlFor="childWeight" className="input-group-text">Weight (kg)</label>
                  <input type="text" className="form-control col-sm-6" id="childWeight" value={childWeight} onChange={(e) => setChildWeight(e.target.value)} required/>
                </div>
              </div>

              <div className="col">
                <div className="input-group mb-2">
                  <label htmlFor="childHeight" className="input-group-text">Height (m)</label>
                  <input type="text" className="form-control col-sm-6" id="childHeight" value={childHeight} onChange={(e) => setChildHeight(e.target.value)} required/>
                </div>
              </div>
            </div>

            <div className="input-group mb-2">
              <label htmlFor="date" className="input-group-text">Date</label>
              <input type="date" className="form-control col-sm-6" id="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
            </div>

            <button type="submit" className="btn vbtn">Submit</button>
          </div>
        </form>
      </div>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

      {bmiData.length > 0 && (
        <div className="container mt-5" style={{ height: '650px', width: '80%'}}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      <button className='btn vbtn'><a href='SendAdviceForm' style={{ textDecoration: 'none', color: 'white' }} onClick={handleAdvices}>Send Advice</a></button>
    </div>
  );
};

export default BmiForm;
