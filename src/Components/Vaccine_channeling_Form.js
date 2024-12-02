import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Channeling.css'
import  VaccineChannelingService from '../Service/VaccineChannelingService';

function Vaccine_channeling_Form() {

    const  userID=200273201475
    const navigate = useNavigate();
    const [parent, setParent] = useState({});
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
    const[childAge,setChildAge]=useState('');
    const[cnumber,setCnumber]=useState('');
    const[next,setNext]=useState('');

    const handleChange = (event) => {
      const { name, value } = event.target;
        if (name === 'chdrid') {
          const numericValue = parseInt(value, 5);
          if (numericValue >= 1) {
            setQuantity(numericValue);
          }
          if (name ==='chdrid') {
            setCHDRId(value);
          }
      }else if (name === 'product') {
        const selectedVaccine = vaccineStock.find(item => item.vlistvaccineName === value);
      setSelectedItem(selectedVaccine);
    }else if (name === 'doctordate') {
        setSelectedDate(value);
      }else if (name === 'channelingType') {
        setChannelingType(value);
        setOrderVaccine(false); 
      } else if (name === 'vaccine') {
        setOrderVaccine(value === 'Yes'); 
      }
    };

    useEffect(() => {
        const fetchParentDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/7Guard/Parent/getParentByParentNIC/${userID}`);
            if (!response.ok) {
              throw new Error('Failed to fetch parent data');
            }
            const userData = await response.json();
            setParent(userData);
          } catch (error) {
            console.error('Error fetching parent data:', error);
          }
        };
    
        fetchParentDetails();
      }, [userID]);
    
    
      const handleEnterClick = async (e) => {
        e.preventDefault(); 
        console.log(userID)
        console.log(cHDRId)
        if (cHDRId) {
          try {
            const response = await fetch(`http://localhost:8080/7Guard/Chdr/getChildByChildCHDR/${cHDRId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch child data');
            }
            const userData = await response.json();
            setChild(userData);
          } catch (error) {
            console.error('Error fetching child data:', error);
          }
        };
    
      }
      console.log(child);

      useEffect(() => {
        
        if (child.dob) {

        let today = new Date();  
        let birthday = new Date(child.dob);
        let age=today-birthday;
        
        let agetime=age/ (1000 * 60 * 60 * 24 * 7);
        let ageweek=agetime.toFixed(2);
        setChildAge(ageweek);}
    
      }, [child]);

     console.log(child.assignDoctor)
    

     useEffect(() => {
      const fetchchannelDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getLatestChannelingId/${selectedDate}/${child.assignDoctor}`);
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
    }, [selectedDate,child.assignDoctor]);

     console.log(cnumber)
    useEffect(() => {
      if(cnumber){
      let newnumber = 0;
     newnumber= cnumber.channel_number+1;
      setNext(newnumber);}
      else{
        setNext(1)
      }
    }, [cnumber]);


console.log(cnumber.channel_number)
      useEffect(() => {
        if (child.assignDoctor) {
          const fetchDoctorDetails = async () => {
            try {
              console.log(child.assignDoctor)
              const response = await fetch(`http://localhost:8080/7Guard/Doctor/getDoctorByDoctorname/${child.assignDoctor}`);
              
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
      }, [child.assignDoctor]);
      

    console.log(doctor)
    
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
      console.log(vaccineStock)

      useEffect(() => {
        const fetchID = async () => {
          try {
            const response = await fetch(`http://localhost:8080/7Guard/Doctor/getDoctorID/${selectedDate}/${child.assignDoctor}`);
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

     const artime=null;

    const handleSubmit = async (event) => {
        event.preventDefault();
       

        let vaccineName = '';
        if (channelingType === 'normal') {
            vaccineName = 'Normal Channeling';
        } else if (channelingType === 'vaccine') {
            vaccineName = orderVaccine ? selectedItem.vlistvaccineName : 'Outside Vaccine';
        }
       
        const channelingData = {
            channeling_babyname: child.firstName,
            channeling_bill: totalAmount,
            channeling_chdr: child.chdrId,
            channeling_date: date,
            channeling_doctor_date: selectedDate,
            channeling_doctor: child.assignDoctor,
            channeling_parent_name: parent.p_fName,
            channeling_telephone: parent.p_mobileNumber,
            channeling_time: datetime,
            channeling_vaccine_name: vaccineName,
            nic: userID,
            requested_qty: requested_qty,
            channel_number:0,
            doctor_id:id.id,
            status: 0,
            arriving_time:artime,
            child_age:childAge,
            admin_status:2,
            email:parent.p_email
        };
        console.log('Submitting Channeling Data:', channelingData);
     
        try {
            const response = await VaccineChannelingService.submitChanneling(channelingData);
            console.log(response);
    
            if (response.data.success) {
              alert(response.data.message);
              navigate(`/Channeling_Success/${userID}`); 
          } else {
              alert(response.data.message); 
          }
      } catch (error) {
          console.error('There was an error submitting the Channeling!', error);
          alert( (error.response?.data?.message || 'Something went wrong!'));
      }
  };

  return (
    <div className='Body1'>
      <div className='container d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
      <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body2'>
        <h1 className="heading">Channeling</h1>
        <form onSubmit={handleSubmit} className='form-inline' >
        
          <div className='form-group row mb-2' >
                  <label htmlFor='impofid' className='col-sm-2 col-form-label'>Name</label>
                  <div className='col-sm-10'>
                  <input className='form-control' type="text" name="paname" value={parent.p_fName || ''} readOnly />
                  </div>
                  </div>
              <div className='form-group row mb-2' >
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>Child Name</label>
                  <div className='col-sm-10  d-flex align-items-center'>
                    <select className='form-control me-2' name="chdrid" value={cHDRId}  onChange={handleChange}>
                    <option value="" disabled >---Select Child Name---</option>
                      {parent.children && parent.children.map((child) => (
                        <option key={child.child_id} value={child.child_id}>
                          {child.c_fName}
                        </option> 
                      ))}
                    </select>
                    <button className='button2' onClick={(e) => handleEnterClick(e)}>Enter</button>
                    </div>
                  </div>
                  
             <div  className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>CHDR ID</label>
                  <div className='col-sm-10'>
                    <input  className='form-control' type="text" name="childname" value={child.chdrId || ''} readOnly />
                  </div>
                  </div>
             <div  className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-2 col-form-label'>Telephone</label>
                  <div className='col-sm-10'>
                  <input className='form-control' type="text" name="telephone" value={parent.p_mobileNumber || ''} readOnly />
                  </div>
                  </div>
               
              <div  className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-2 col-form-label'>Doctor Name</label>
                  <div className='col-sm-10'>
                    <input className='form-control' type="text" name="docname" value={child.assignDoctor || ''}  readOnly/>
                  </div>
                  </div>
                  <div   className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>Channeling Date</label>
                  <div className='col-sm-10'>
                    <select className='form-control' name="doctordate" value={selectedDate}  onChange={handleChange}>
                    <option value="" disabled >---Select Date---</option>
                      {doctor
                         .filter((doc) => {
                          const docDate = Date.parse(doc.availableDate);
                          return  docDate > new Date().getTime(); 
                        })
                      .map((doc) => (
                        <option key={doc.id} value={doc.availableDate}>
                          {doc.availableDate}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>
                  <div   className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-2 col-form-label'>Your Channel Number</label>
                  <div className='col-sm-10'>
                  <input className='form-control ' type="text"  value={next} readOnly />
                  </div>
                  </div>
                  <div className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>Channeling Type</label><br></br>
                  <div className='col-sm-10'>
                  <div className="form-check form-check-inline">
                 <input type="radio" value="normal" name="channelingType"  onChange={handleChange}/> Normal Channeling
                 <input type="radio" value="vaccine" name="channelingType" onChange={handleChange} /> Vaccine Channeling
                 </div>
                 </div>
                </div><br></br>
                {channelingType === 'vaccine' && (
              <>
                  <div className='form-group row mb-2'>
                  <label   htmlFor='impofid' className='col-sm-2 col-form-label' >Order Vaccine</label><br></br>
                  <div className='col-sm-10'>
                  <div className="form-check form-check-inline">
                 <input type="radio" value="Yes" name="vaccine"  onChange={handleChange}/> Yes
                 <input type="radio" value="No" name="vaccine"  onChange={handleChange}/> No
                 </div>
                 </div>
                </div><br></br>
                {orderVaccine && (
                  <>
                <div   className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-2 col-form-label'>Vaccine Name</label>
                  <div className='col-sm-10'>
                    <select className='form-control' name="product" value={selectedItem.vaccineName}  onChange={handleChange}>
                    <option value="" disabled >---Select Vaccine---</option>
                      {vaccineStock.map((item) => (
                        
                        <option key={item.vlistid} value={item.vlistvaccineName}>
                          {item.vlistvaccineName}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                  </>
                )}
              </>
            )}
                  <div  className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>Bill</label>
                  <div className='col-sm-10'>
                 <input className='form-control' type="text" name="billAmount" value={totalAmount} readOnly />
                  </div>
                  </div>
              
                  <div   className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-2 col-form-label'>Date</label>
                  <div className='col-sm-10'>
                    <input className='form-control ' type="datetime-local" name="date"  value={datetime} readOnly/>
                  </div>
               </div>
          <button className="button1" type="submit"  disabled={!cHDRId || !selectedDate || !channelingType}>
            Submit
          </button>
          
        </form>
      </div>
      </div>
    </div>
  );
}

export default Vaccine_channeling_Form;
