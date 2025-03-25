import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Service from '../../Service/Service';

function VaccinationForm() {
  const navigate = useNavigate();

  const [channelingid, setRefNo] = useState('');
  const [CHDRID, setCHDRID] = useState('');
  const [vaccinePerpose, setVaccinePerpose] = useState('');
  const [outsideVaccineName, setOutsideVaccineName] = useState('');
  const [vaccineName, setVaccineName] = useState('');
  const [scan, setScan] = useState('');
  const [date, setDate] = useState('');
  const [impofid, setImpofid] = useState(''); 

  const scanInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const chdrInputRef = useRef(null);

  const [channeling, setChanneling] = useState([]);
  const [vaccineStock, setVaccineStock] = useState([]);

  
  const handleEnterClick = async (channelingid) => {
    if (channelingid) {
      try {
        const response = await fetch(
          `http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingid}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch channeling data');
        }
        const userData = await response.json();
        setChanneling(userData);
        setVaccinePerpose(userData.channeling_vaccine_name || '');
        setCHDRID(userData.channeling_chdr || '');

        
        const matchingVaccine = vaccineStock.find(
          (item) => item.impofvaccine_name === userData.channeling_vaccine_name
        );
        if (matchingVaccine) {
          setVaccineName(matchingVaccine.impofvaccine_name);
          setImpofid(matchingVaccine.impofid); 
        }
      } catch (error) {
        console.error('Error fetching channeling data:', error);
      }
    }
  };

  
  useEffect(() => {
    const fetchVaccineStock = async () => {
      try {
        const response = await fetch('http://localhost:8080/iov/viov');
        if (!response.ok) {
          throw new Error('Failed to fetch Vaccine stock');
        }
        const itemStockData = await response.json();
        setVaccineStock(itemStockData);
      } catch (error) {
        console.error('Error fetching vaccine stock:', error);
      }
    };

    fetchVaccineStock();
  }, []);


  const handleVaccineNameChange = (e) => {
    const selectedVaccine = e.target.value;
    setVaccineName(selectedVaccine);

   
    const selectedStock = vaccineStock.find(
      (item) => item.impofvaccine_name === selectedVaccine
    );
    if (selectedStock) {
      setImpofid(selectedStock.impofid);
    }
  };
  const email=channeling.email;
console.log("id",impofid)
console.log("scan",scan)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const scanData = {
      chdr_id: CHDRID,
      cha_id: channelingid,
      vaccine_purpose: vaccinePerpose,
      vaccine_name: vaccineName,
      impofid:impofid,
      date,
      scan,
      email:channeling.email,
      
    };
    console.log("testing",scanData)
    try {
      const response = await axios.post(
        'http://localhost:8080/api/Scan/add',
        scanData);
      console.log(scanData)
      if (response.status === 200) {
        alert('Scan data successfully submitted');
        resetForm();
        navigate(`/SideEffectToken/${vaccineName}/${channeling.email}`);
      }
    } catch (error) {
      console.error('Error submitting scan data:', error);
      alert('Error submitting scan data');
    }
  };
console.log(vaccineName)
  const resetForm = () => {
    setRefNo('');
    setCHDRID('');
    setVaccinePerpose('');
    setVaccineName('');
    setImpofid('');
    setScan('');
    setDate('');
  };

  return (
    <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
        <div className="col-sm-10 py-2 px-5 shadow form21" id='Body2'>
        <h1 className='ha4'>Injected Vaccination Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group row mb-2">
            <label className="col-sm-2 col-form-label" htmlFor="channelingid">Channeling ID: </label>
            <div className="col-sm-8">
            <input
              type="text"
              id="channelingid"
              value={channelingid}
              onChange={(e) => setRefNo(e.target.value)}
              placeholder="Enter Channeling ID"
              className="form-control"
            />
          </div>
          </div>

            <button className='btn vbtn mb-2' type="button" onClick={() => handleEnterClick(channelingid)}>Enter</button>
          
          <div className="form-group row mb-2">
            <label className="col-sm-2 col-form-label" htmlFor="CHDRID">CHDR ID: </label>
            <div className="col-sm-8">
            <input
              type="text"
              id="CHDRID"
              ref={chdrInputRef}
              value={CHDRID}
              readOnly
              className="form-control"
            />
          </div>
          </div>

          <div className="form-group row mb-2">
            <label className="col-sm-2 col-form-label" htmlFor="vaccinePerpose">Vaccine Purpose: </label>
            <div className="col-sm-8">
              <input
              type="text"
              id="vaccinePerpose"
              value={vaccinePerpose}
              readOnly
              className="form-control"
            />
          </div>
          </div>

          {vaccinePerpose.trim().toLowerCase() === 'outside vaccine' && (
            <div className="form-group row mb-2">
              <label className="col-sm-2 col-form-label" htmlFor="vaccineName">Vaccine Name: </label>
              <div className="col-sm-8">
                <select
                className="form-control"
                id="vaccineName"
                value={vaccineName}
                onChange={handleVaccineNameChange}
                
              >
                <option value="" disabled>
                  ---Select Vaccine---
                </option>
                {vaccineStock.map((item) => (
                  <option key={item.impofid} value={item.impofvaccine_name}>
                    {item.impofvaccine_name}
                  </option>
                ))}
              </select>
            </div>
            </div>
          )}

          <div className="form-group row mb-2">
            <label className="col-sm-2 col-form-label" htmlFor="scan">Scan Barcode: </label>
            <div className="col-sm-8">
              <input
              type="text"
              id="scan"
              ref={scanInputRef}
              value={scan}
              onChange={(e) => setScan(e.target.value)}
              placeholder="Scan barcode here"
              className="form-control"
              autoFocus
            />
          </div>
          </div>

          <div className="form-group row mb-2">
            <label className="col-sm-2 col-form-label" htmlFor="date">Date: </label>
            <div className="col-sm-8">
              <input
              type="date"
              id="date"
              ref={dateInputRef}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
            />
          </div>
          </div>

         
              <button type="submit" className="btn vbtn">Save</button>
            
        </form>
      </div>
    
    </div>
    </div>
  );
}

export default VaccinationForm;
