import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VaccineChannelingService from '../../Service/VaccineChannelingService';
import './Channeling.css'

export default function Admin_Channeling_Edit() {
  const navigate = useNavigate();
  const { channelingID } = useParams();
  const [channeling, setChanneling] = useState({});
  const [child, setChild] = useState({});
  const [doctor, setDoctor] = useState([]);
  const [vaccineStock, setVaccineStock] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [cHDRId, setCHDRId] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [channelingType, setChannelingType] = useState('');
  const [orderVaccine, setOrderVaccine] = useState(false);
  const requested_qty = 1;
  const [count, setCount] = useState(null);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [doctorAllocation, setDoctorAllocation] = useState(0);
  const [canChannel, setCanChannel] = useState(true);
  const [cnumber, setCnumber] = useState('');
  const [next, setNext] = useState('');


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'product') {
      const selectedVaccine = vaccineStock.find(item => item.vlistvaccine_name === value);
      setSelectedItem(selectedVaccine);

    } else if (name === 'channelingType') {
      setChannelingType(value);
      setOrderVaccine(false);
    } else if (name === 'vaccine') {
      setOrderVaccine(value === 'Yes');
      if (value === 'No') {
        setSelectedItem({ vlistvaccine_name: 'Outside Vaccine' });
      }
    }
  };


  useEffect(() => {
    const fetchChannelingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch channeling data');
        }
        const Data = await response.json();
        setChanneling(Data);
      } catch (error) {
        console.error('Error fetching channeling data:', error);
      }
    };

    fetchChannelingDetails();
  }, [channelingID]);
  useEffect(() => {
    if (channeling.channeling_doctor & channeling.channeling_doctor_date) {
      const fetchchannelDetails = async () => {
        console.log(channeling.channeling_doctor_date)
        try {
          const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getLatestChannelingId/${channeling.channeling_doctor_date}/${channeling.channeling_doctor}`);
          if (!response.ok) {
            throw new Error('Failed to fetch parent data');
          }
          const userData = await response.json();
          setCnumber(userData);
        } catch (error) {
          console.error('Error fetching parent data:', error);
        }
      };

      fetchchannelDetails();
    }
  }, [selectedDate, child.assignDoctor]);


  useEffect(() => {
    if (channeling.channeling_doctor) {
      const fetchDoctorDetails = async () => {
        try {
          console.log(channeling.channeling_doctor)
          const response = await fetch(`http://localhost:8080/7Guard/Doctor/getDoctorByDoctorname/${channeling.channeling_doctor}`);

          if (!response.ok) {
            throw new Error('Failed to fetch doctor data');
          }
          const doctorData = await response.json();

          setDoctor(doctorData);
        } catch (error) {
          console.error('Error fetching doctor data:', error);
        }
      };
      fetchDoctorDetails();
    }
  }, [channeling.channeling_doctor]);




  useEffect(() => {
    const fetchVaccineStock = async () => {
      try {
        const response = await fetch(`http://localhost:8080/vl/gvl`);
        if (!response.ok) {
          throw new Error('Failed to fetch Vaccine');
        }
        const itemStockData = await response.json();
        setVaccineStock(itemStockData);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchVaccineStock();
  }, []);

  useEffect(() => {
    if (channeling.channeling_doctor & channeling.channeling_doctor_date) {
      const fetchID = async () => {
        console.log(channeling.channeling_doctor_date)
        try {
          const response = await fetch(`http://localhost:8080/7Guard/Doctor/getDoctorID/${channeling.channeling_doctor_date}/${channeling.channeling_doctor}`);
          if (!response.ok) {
            throw new Error('Failed to fetch id');
          }
          const Data = await response.json();
          setId(Data);

        } catch (error) {
          console.error('Error fetching id:', error);
        }
      };

      fetchID();
    }
  }, [selectedDate]);


  useEffect(() => {
    let newTotalAmount = 0;
    if (channelingType === 'normal') {
      newTotalAmount = 2500;

    } else if (channelingType === 'vaccine') {
      if (orderVaccine && selectedItem && selectedItem.price) {

        newTotalAmount = selectedItem.price + 2500;
      } else {

        newTotalAmount = 3000;
      }
    }

    setTotalAmount(newTotalAmount);
  }, [channelingType, orderVaccine, selectedItem]);




  const handleSubmit = async (event) => {
    event.preventDefault();


    let vaccineName = '';
    if (channelingType === 'normal') {
      vaccineName = 'Normal Channeling';
    } else if (channelingType === 'vaccine') {
      vaccineName = orderVaccine ? selectedItem.vlistvaccine_name : 'Outside Vaccine';
    }
    const userID = channeling.nic
    const channelingData = {
      cha_id: channelingID,
      channeling_babyname: channeling.channeling_babyname,
      channeling_bill: totalAmount,
      channeling_chdr: channeling.channeling_chdr,
      channeling_date: date,
      channeling_doctor_date: channeling.channeling_doctor_date,
      channeling_doctor: channeling.channeling_doctor,
      channeling_parent_name: channeling.channeling_parent_name,
      channeling_telephone: channeling.channeling_telephone,
      channeling_time: datetime,
      channeling_vaccine_name: vaccineName,
      nic: channeling.nic,
      requested_qty: requested_qty,
      channel_number: channeling.channel_number,
      doctor_id: channeling.doctor_id,
      status: 0,
      arriving_time: channeling.arriving_time,
      child_age: channeling.child_age,
      admin_status: 2,
      email: channeling.email

    };
    console.log('Submitting Channeling Data:', channelingData);

    try {
      const response = await VaccineChannelingService.updateChanneling(channelingID, channelingData);
      console.log(response);

      if (response.data.success) {
        alert(response.data.message);
        navigate(`/AdminChannelingToken/${channelingID}/${userID}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('There was an error submitting the Channeling!', error);
      alert('An error occurred: ' + (error.response?.data?.message || 'Something went wrong!'));
    }
  };

  return (
    <div className='form20'>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21" id='Body5'>
          <h1 className="vhead">Update Channeling</h1>
          <form onSubmit={handleSubmit} className="form-inline">


            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Name :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="paname" value={channeling.channeling_parent_name || ''} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>CHDR ID :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="chdrid" value={channeling.channeling_chdr} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Child Name :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="childname" value={channeling.channeling_babyname || ''} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Telephone :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="telephone" value={channeling.channeling_telephone || ''} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Doctor Name :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="docname" value={channeling.channeling_doctor || ''} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Channeling Date :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" value={channeling.channeling_doctor_date || ''} readOnly></input>
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-4 col-form-label'>Your Channel Number :</label>
              <div className="col-sm-7">
                <input className='form-control col-sm-6' type="text" value={channeling.channel_number || ''} readOnly />
              </div>
            </div>

            <div className="form-group row mb-2">
              <label className="col-sm-2 col-form-label">Channeling Type :</label>
              <div className="col-sm-8" >
                <div className="form-check form-check-inline" >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input type="radio" value="normal" name="channelingType" onChange={handleChange} />Normal Channeling
                    <input type="radio" value="vaccine" name="channelingType" onChange={handleChange} />Vaccine Channeling
                  </div>

                </div>
              </div>
            </div>

            {channelingType === 'vaccine' && (
              <>
                <div className="form-group row mb-2">
                  <label className="col-sm-2 col-form-label">Order Vaccine :</label>
                  <div className="col-sm-8">
                    <div className="form-check form-check-inline">
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input type="radio" value="Yes" name="vaccine" onChange={handleChange} /> Yes
                        <input type="radio" value="No" name="vaccine" onChange={handleChange} /> No
                      </div>
                    </div>
                  </div>
                </div>
                {orderVaccine && (
                  <>
                    <div className='form-group row mb-2'>
                      <label className='col-sm-2 col-form-label'>Vaccine Name :</label>
                      <div className="col-sm-8">
                        <select className='form-control' name="product" value={selectedItem?.vlistvaccine_name || ''} onChange={handleChange}>
                          <option value="" disabled>---Select Vaccine---</option>
                          {vaccineStock.map(item => (
                            <option key={item.vlistid} value={item.vlistvaccine_name}>
                              {item.vlistvaccine_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Bill :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="text" name="billAmount" value={totalAmount} readOnly />
              </div>
            </div>

            <div className='form-group row mb-2'>
              <label className='col-sm-2 col-form-label'>Date :</label>
              <div className="col-sm-8">
                <input className='form-control col-sm-6' type="datetime-local" name="date" value={datetime} readOnly />
              </div>
            </div>

            <button className="btn vbtn" type="submit" disabled={!channelingType}>
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};


