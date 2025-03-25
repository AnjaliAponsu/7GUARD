import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Bmi.css';
import { Link } from 'react-router-dom';

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
  const [chdrId, setChdrId] = useState('');
  const [childWeight, setChildWeight] = useState('');
  const [childHeight, setChildHeight] = useState('');
  const [date, setDate] = useState('');
  const [bmiData, setBmiData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchChdrId, setFetchChdrId] = useState('');

  const chartRef = useRef(null);

  const fetchBmiDataByChdrId = async () => {
    if (!fetchChdrId.trim()) {
      setErrorMessage('Enter a valid CHDR ID.');
      return;
    }

    const inputChdrId = parseInt(fetchChdrId.trim(), 10);
    if (isNaN(inputChdrId)) {
      setErrorMessage('CHDR ID must be a valid number.');
      return;
    }

    try {
      const response = await fetch(`${FETCH_API_URL}?chdrId=${inputChdrId}`);
      if (!response.ok) throw new Error('Failed to fetch BMI data');

      const data = await response.json();
      console.log('Fetched BMI Data:', data); 
      if (data.length === 0) {
        setErrorMessage(`No data found for CHDR ID: ${inputChdrId}`);
        setBmiData([]);
      } else {
        setErrorMessage('');
        setBmiData(data);
      }
    } catch (error) {
      setErrorMessage('Error loading BMI data.');
    }
  };

  useEffect(() => {
    console.log('Updated BMI Data State:', bmiData); 
  }, [bmiData]);

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
        fetchBmiDataByChdrId(); 
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add BMI record');
      }
    } catch (error) {
      setErrorMessage('Failed to add BMI record.');
    }
  };

  //chart part//

  const chartData = {
    labels: bmiData.map(record => record.childWeight), // x axis weight
    datasets: [
      {
        label: `BMI Data for CHDR ID: ${fetchChdrId}`,
        data: bmiData.map(record => ({
          x: record.childWeight ,
          y: record.childHeight,
          date: record.date,
          bmi: parseFloat(record.bmiValue.toFixed(2)), //round off
          bmiStatus: record.bmiStatus,
        
        })),
        //graph lines css//
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
            return ''; // to remove the top label weight
          },
          label: function (context) {
            const { x, y, date, bmi, bmiStatus } = context.raw; // take data from each point
            return [
              `Date: ${date}`,
              `BMI: ${parseFloat(bmi).toFixed(2)}`, //round off
              `Status: ${bmiStatus}`,
              `Weight: ${x} kg`,
              `Height: ${y} m`,
            ]; 
          },
        },
        // line break
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

  return (
    <div className="Body1">
      <div className="col-sm-8 py-2 px-5 shadow container" id="Body2">
        <h1 className="ha4">BMI Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-group mb-2">
              <label htmlFor="chdrId" className="input-group-text">CHDR ID</label>
              <input type="text" className="form-control col-sm-6" id="chdrId" value={chdrId} onChange={(e) => setChdrId(e.target.value)} required/>
            </div>

            <div className="row">
              <div className="col">
                <div className="input-group mb-2">
                  <label htmlFor="childWeight" className="input-group-text">Weight (kg)</label>
                  <input type="text" className="form-control col-sm-6"  id="childWeight" value={childWeight} onChange={(e) => setChildWeight(e.target.value)} required/>
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

      <div className="Body1">
        </div><div className="col-sm-8 py-2 px-5 offset-2 shadow mt-4">
        <h2 className="heading1">Load BMI Data</h2>
        <div className="input-group mb-3">
          <input type="text" className="form-control"  placeholder="Enter CHDR ID" value={fetchChdrId} onChange={(e) => setFetchChdrId(e.target.value)}/>
          <button className="btn vbtn" onClick={fetchBmiDataByChdrId}>Load Graph</button>
        </div>
      </div>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

      {bmiData.length > 0 && (
        <div className="container mt-5" style={{ height: '400px', width: '80%' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      <button className='btn vbtn' tyle={{textDecoration:'none', color:'white'}}><a href='SendAdviceForm' style={{textDecoration:'none', color:'white'}}>Send Advice</a></button>
    </div>
  );
};

export default BmiForm;
