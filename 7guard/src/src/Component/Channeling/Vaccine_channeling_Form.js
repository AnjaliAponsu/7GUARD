import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Channeling.css'
import  VaccineChannelingService from '../../Service/VaccineChannelingService';

function Vaccine_channeling_Form() {
    const {parentNic}=useParams();
    console.log("nic",parentNic)
    const navigate = useNavigate();
    const [parent, setParent] = useState({});
    const [child, setChild] = useState({});
    const [children, setChildren] = useState({});
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
      } else if (name === 'product') {
        const selectedVaccine = vaccineStock.find((item) => item.vlistvaccine_name === value);
        setSelectedItem(selectedVaccine || ''); 
    }else if (name === 'doctordate') {
        setSelectedDate(value);
      }else if (name === 'channelingType') {
        if (value === 'normal') {
          setSelectedItem({ vlistvaccine_name: 'Normal Channeling' });
        }
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
        const fetchParentDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/v1/getParentByParentNIC/${parentNic}`);
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
      }, [parentNic]);
      console.log("parent",parent)

      useEffect(() => {
        const fetchChildDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/v1/getChildByParentNic/${parentNic}`);
            if (!response.ok) {
              throw new Error('Failed to fetch parent data');
            }
            const userData = await response.json();
            setChildren(userData);
       
          } catch (error) {
            console.error('Error fetching parent data:', error);
          }
        };
    
        fetchChildDetails();
      }, [parentNic]);
      console.log("child",children)
  
  console.log("t",cHDRId)
  
      const handleEnterClick = async (e) => {
        e.preventDefault(); 
        console.log(parentNic)
        console.log("id",cHDRId)
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
      console.log("selected",child);

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
            const response = await fetch('http://localhost:8080/vl/gvl');
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
            vaccineName = orderVaccine ? selectedItem.vlistvaccine_name : 'Outside Vaccine';
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
            channeling_vaccine_name: selectedItem.vlistvaccine_name,
            nic: parentNic,
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
              navigate(`/Channeling_Success/${parentNic}`); 
          } else {
              alert(response.data.message); 
          }
      } catch (error) {
          console.error('There was an error submitting the Channeling!', error);
          alert( (error.response?.data?.message || 'Something went wrong!'));
      }
  };

  return (
    
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' , width:'910px' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21" id='Body2'>
        
        <form onSubmit={handleSubmit} className='form-inline' >
        <h1 className="ha4">Channeling</h1>
        
          <div className='form-group row mb-2' >
                  <label htmlFor='impofid' className='col-sm-4 col-form-label'>Name :</label>
                  <div className='col-sm-7'>
                  <input className='form-control' type="text" name="paname" value={parent.p_fName || ''} readOnly />
                  </div>
                  </div>
              <div className='form-group row mb-2' >
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>Child Name :</label>
                  <div className='col-sm-7  d-flex align-items-center'>
                    <select className='form-control me-2' name="chdrid" value={cHDRId}  onChange={handleChange}>
                    <option value="" disabled >---Select Child Name---</option>
                      {children && children.length > 0 && children.map((child) => (
                        <option key={child.child_id} value={child.child_id}>
                          {child.c_fName}
                        </option> 
                      ))}
                    </select>
                    <button className='btn vbtn' onClick={(e) => handleEnterClick(e)}>Enter</button>
                    </div>
                  </div>
                  
             <div  className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>CHDR ID :</label>
                  <div className='col-sm-7'>
                    <input  className='form-control' type="text" name="childname" value={child.chdrId || ''} readOnly />
                  </div>
                  </div>
             <div  className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-4 col-form-label'>Telephone :</label>
                  <div className='col-sm-7'>
                  <input className='form-control' type="text" name="telephone" value={parent.p_mobileNumber || ''} readOnly />
                  </div>
                  </div>
               
              <div  className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-4 col-form-label'>Doctor Name :</label>
                  <div className='col-sm-7'>
                    <input className='form-control' type="text" name="docname" value={child.assignDoctor || ''}  readOnly/>
                  </div>
                  </div>
                  <div   className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>Channeling Date :</label>
                  <div className='col-sm-7'>
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
                  <label htmlFor='impofid' className='col-sm-4 col-form-label'> Channel Number :</label>
                  <div className='col-sm-7'>
                  <input className='form-control ' type="text"  value={next} readOnly />
                  </div>
                  </div>
                  <div className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>Channeling Type :</label><br></br>
                  <div className='col-sm-8'>
                  <div className="form-check form-check-inline" style={{ display: "flex", gap: "10px" }}>
                 <input type="radio" value="normal" name="channelingType"  onChange={handleChange}/> Normal <br/>
                 <input type="radio" value="vaccine" name="channelingType" onChange={handleChange} /> Vaccine 
                 </div>
                 </div>
                </div>
                {channelingType === 'vaccine' && (
              <>
                  <div className='form-group row mb-2'>
                  <label   htmlFor='impofid' className='col-sm-4 col-form-label' >Order Vaccine :</label><br></br>
                  <div className='col-sm-7'>
                  <div className="form-check form-check-inline" style={{ display: "flex", gap: "20px" }}>
                 <input type="radio" value="Yes" name="vaccine"  onChange={handleChange}/> Yes
                 <input type="radio" value="No" name="vaccine"  onChange={handleChange}/> No
                 </div>
                 </div>
                </div>
                {orderVaccine && (
                  <>
                <div   className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-4 col-form-label'>Vaccine Name :</label>
                  <div className='col-sm-7'>
                    <select className='form-control' name="product" value={selectedItem.vlistvaccine_name}  onChange={handleChange}>
                    <option value="" disabled >---Select Vaccine---</option>
                      {vaccineStock.map((item) => (
                        
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
                  <div  className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>Bill :</label>
                  <div className='col-sm-7'>
                 <input className='form-control' type="text" name="billAmount" value={totalAmount} readOnly />
                  </div>
                  </div>
              
                  <div   className='form-group row mb-2'>
                  <label  htmlFor='impofid' className='col-sm-4 col-form-label'>Date :</label>
                  <div className='col-sm-7'>
                    <input className='form-control ' type="datetime-local" name="date"  value={datetime} readOnly/>
                  </div>
               </div>
          <button className="btn vbtn" type="submit"  disabled={!cHDRId || !selectedDate || !channelingType}>
            Submit
          </button>
          
        </form>
      </div>
      </div>
    
    
  );
}

export default Vaccine_channeling_Form;
