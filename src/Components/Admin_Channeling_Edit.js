import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  VaccineChannelingService from '../Service/VaccineChannelingService';
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
    const requested_qty=1;
    const [count, setCount] = useState(null);
    const [error, setError] = useState('');
    const [id, setId] = useState('');
    const [doctorAllocation, setDoctorAllocation] = useState(0);
    const [canChannel, setCanChannel] = useState(true);
    const[cnumber,setCnumber]=useState('');
    const[next,setNext]=useState('');


    const handleChange = (event) => {
        const { name, value } = event.target;
      if (name === 'product') {
        const selectedVaccine = vaccineStock.find(item => item.vlistvaccineName === value);
      setSelectedItem(selectedVaccine);
    
      }else if (name === 'channelingType') {
        setChannelingType(value);
        setOrderVaccine(false); 
      } else if (name === 'vaccine') {
        setOrderVaccine(value === 'Yes'); 
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
}}, [selectedDate,child.assignDoctor]);
  
 
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
            const response = await fetch(`http://localhost:8080/7Guard/Vaccine/getVaccines`);
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
 } }, [selectedDate]);
    
      
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
            vaccineName = orderVaccine ? selectedItem.vlistvaccineName : 'Outside Vaccine';
        }
       const userID=channeling.nic
        const channelingData = {
            cha_id:channelingID,
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
            channel_number:channeling.channel_number,
            doctor_id:channeling.doctor_id,
            status: 0,
            arriving_time:channeling.arriving_time,
            child_age:channeling.child_age,
            admin_status:2,
            email:channeling.email    

        };
        console.log('Submitting Channeling Data:', channelingData);
     
        try {
            const response = await VaccineChannelingService.updateChanneling(channelingID,channelingData);
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
    <div className='Body1'>
      <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body5'>
        <h1 className="heading">Update Channeling</h1>
        <form onSubmit={handleSubmit} >
        <div className='fo1'>
          <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Name</label>
                    <input className='form-control col-sm-6' type="text" name="paname" value={channeling.channeling_parent_name|| ''} readOnly />
                  </div>
              <div  className='input-group mb-5'>
                  <label  className='input-group-text'>CHDR ID</label>
               
                    <input className='form-control col-sm-6' type="text" name="chdrid" value={channeling.channeling_chdr} readOnly />
                    
                  </div>
             <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Child Name</label>
                
                    <input  className='form-control col-sm-6' type="text" name="childname" value={channeling.channeling_babyname|| ''} readOnly />
                  </div>
             <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Telephone</label>
                  <input className='form-control col-sm-6' type="text" name="telephone" value={channeling.channeling_telephone || ''} readOnly />
                  </div>
               
              <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Doctor Name</label>
                
                    <input className='form-control col-sm-6' type="text" name="docname" value={channeling.channeling_doctor || ''}  readOnly/>
                  </div>
                  <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Channeling Date</label>
                   <input className='form-control col-sm-6' type="text"  value={channeling.channeling_doctor_date || ''} readOnly></input>
                    <label  className='input-group-text'>Your Channel Number</label>
                    <input className='form-control col-sm-6' type="text"  value={channeling.channel_number || ''} readOnly />
                  </div>
                  <div>
                  <label >Channeling Type</label><br></br>
                  <div className="form-check form-check-inline">
                 <input type="radio" value="normal" name="channelingType"  onChange={handleChange}/> Normal Channeling
                 <input type="radio" value="vaccine" name="channelingType" onChange={handleChange} /> Vaccine Channeling
                 </div>
                </div><br></br>
                {channelingType === 'vaccine' && (
              <>
                  <div>
                  <label >Order Vaccine</label><br></br>
                  <div className="form-check form-check-inline">
                 <input type="radio" value="Yes" name="vaccine"  onChange={handleChange}/> Yes
                 <input type="radio" value="No" name="vaccine"  onChange={handleChange}/> No
                 </div>
                </div><br></br>
                {orderVaccine && (
                  <>
                <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Vaccine Name</label>
                    <select className='form-control col-sm-6' name="product" value={selectedItem.name}  onChange={handleChange}>
                    <option value="" disabled >---Select Vaccine---</option>
                      {vaccineStock.map((item) => (
                        
                        <option key={item.vlistid} value={item.vlistvaccineName}>
                          {item.vlistvaccineName}
                        </option>
                      ))}
                    </select>
                  </div>
                  </>
                )}
              </>
            )}
                  <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Bill</label>
                
                 <input className='form-control col-sm-6' type="text" name="billAmount" value={totalAmount} readOnly />
                  </div>
              
                  <div  className='input-group mb-5'>
                  <label  className='input-group-text'>Date</label>
                
                    <input className='form-control col-sm-6' type="datetime-local" name="date"  value={datetime} readOnly/>
                  </div>
               
                  <button className="button1" type="submit"  disabled={ !channelingType}>
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};


