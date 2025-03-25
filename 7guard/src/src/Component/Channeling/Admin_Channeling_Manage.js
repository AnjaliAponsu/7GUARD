import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import  VaccineChannelingService from '../../Service/VaccineChannelingService';
import './Channeling.css'

function Admin_Channeling_Manage() {
  const navigate = useNavigate();
  const [channeling1, setChanneling1] = useState([]);
  const [channeling2, setChanneling2] = useState([]);
  const [channeling3, setChanneling3] = useState([]);
  const [doctors1, setDoctors1] = useState([]);
  const [doctors2, setDoctors2] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [quantities, setQuantities] = useState({});
  const [orderc, setOrderc] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [channelc, setChannelc] = useState([]);
  const [channelAdmin, setChannelAdmin] = useState('');
  const [statusCheck, setStatusCheck] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
 if (name === 'doctor') {
  setSelectedDoctor(value);
}else if (name === 'date') {
    setSelectedDate(value);
 
};
  }
  const handleEnterClick1 = async (selectedDate) => {
        if (selectedDate) {
      try {
        const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingDate/${selectedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }
        const orderData = await response.json(); 
        setChanneling1(orderData);
        
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

}
  
const handleEnterClick2 = async (selectedDoctor) => {
    if (selectedDoctor) {
  try {
    const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingDoctor/${selectedDoctor}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order data');
    }
    const orderData = await response.json(); 
    setChanneling2(orderData);
    
  } catch (error) {
    console.error('Error fetching order data:', error);
  }
};

}
useEffect(() => {
  const fetchChannelingDetails = async () => {
    try {
      console.log(selectedDate)
      console.log(selectedDoctor)
      const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingDateDoctor/${selectedDate}/${selectedDoctor}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }
      const orderData = await response.json();
      setChanneling3(orderData);
      
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  fetchChannelingDetails();
}, [selectedDate,selectedDoctor]);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/7Guard/Doctor/getDoctors');
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }
        const doctorData = await response.json();
        const uniqueDoctors = doctorData.filter((doctor, index, self) =>
            index === self.findIndex(d => d.doctorId === doctor.doctorId)
          );
          const uniqueDoctor = doctorData.filter((doctor, index, self) =>
            index === self.findIndex(d => d.availableDate === doctor.availableDate)
          );

        setDoctors1(uniqueDoctors);
        console.log(uniqueDoctor)
        setDoctors2(uniqueDoctor);
        console.log(uniqueDoctors)
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchDoctorDetails();
  }, []);
console.log(doctors1)
console.log(doctors2)

  useEffect(() => {
    calculateQuantities(channeling1);
  }, [ channeling1]);

  const calculateQuantities = (channeling1) => {
    const quantities = {};

    channeling1.forEach(channel => {
      
        const itemName = channel.channeling_vaccine_name;
        if (!quantities[itemName]) {
          quantities[itemName] = 0;
        }
        
        const quantity = isNaN(channel.requested_qty) || channel.requested_qty === undefined ? 0 : channel.requested_qty;
    quantities[itemName] += quantity;
    
      }
    );

    setQuantities(quantities);
  };
  const handleEditClick = (channelingId) => navigate(`/AdminChannelingEdit/${channelingId}`);

  const handleDeleteClick = async(channelid,channel) => {
    console.log(channelid)
    console.log(channel)
      const confirmed = window.confirm("Do you want to disable this channeling?");
      if (confirmed && channel && channelid ) {
        const channelingData = {
          cha_id:channelid,
          channeling_babyname:channel.channeling_babyname,
          channeling_bill:channel.channeling_bill,
          channeling_chdr:channel.channeling_chdr,
          channeling_date:channel.channeling_date, 
          channeling_doctor_date:channel.channeling_doctor_date,
          channeling_doctor:channel.channeling_doctor,  
          channeling_parent_name:channel.channeling_parent_name,
          channeling_telephone:channel.channeling_telephone,
          channeling_time:channel.channeling_time,   
          channeling_vaccine_name :channel.channeling_vaccine_name, 
          nic:channel.nic,
          requested_qty:0,
          channel_number:channel.channel_number,
          status:0,
          arriving_time:channel.arriving_time,
          child_age:channel.child_age,
          admin_status:3,
          
      };
     console.log(channelingData)
      if (channelid) {
        try {
          await  VaccineChannelingService.updateAdminChanneling(channelid, channelingData)
          const orderResponse = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelid}`);
          if (!orderResponse.ok) {
            throw new Error('Failed to disable data');
          }
          const updatedOrder = await orderResponse.json();
        setChannelAdmin(updatedOrder);
       
        } catch (error) {
          console.error('Error disabaling data:', error);
          
        }
      };
    }
  }
  console.log(channelAdmin)
  const handleEmailClick = (ChannelID) => navigate(`/AdminBillToken/${ChannelID}`);
 
  const handleSubmitClick = async (channelingID,channel) => {
    console.log(channel)
    console.log(channelingID)
    if(channelingID){
    const channelingData = {
        cha_id:channelingID,
        channeling_babyname:channel.channeling_babyname,
        channeling_bill:channel.channeling_bill,
        channeling_chdr:channel.channeling_chdr,
        channeling_date:channel.channeling_date, 
        channeling_doctor_date:channel.channeling_doctor_date,
        channeling_doctor:channel.channeling_doctor,  
        channeling_parent_name:channel.channeling_parent_name,
        channeling_telephone:channel.channeling_telephone,
        channeling_time:channel.channeling_time,   
        channeling_vaccine_name :channel.channeling_vaccine_name, 
        nic:channel.nic,
        requested_qty:channel.requested_qty,
        channel_number:channel.channel_number,
        status:1,
        arriving_time:channel.arriving_time,
        child_age:channel.child_age,
        admin_status:2,
            
    };
  console.log(channelingData)
      try {
        const response = await VaccineChannelingService.updateStatusChanneling(channelingID,channelingData);
        const orderResponse = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingID}`);
        if (!orderResponse.ok) {
          throw new Error('Failed to fetch order data');
      
        }
        const updatedOrder = await orderResponse.json();
      setChannelc(updatedOrder);
      setStatusCheck(channelc.status)
      setChanneling1(prevOrders => 
        prevOrders.map(o => o.cha_id === channelingID ? updatedOrder : o)
      );
      } catch (error) {
        console.error('Error fetching order data:', error);
        
      }
    };
  }


  return (
    <div>
       <div  className='input-group mb-2'>
                    <label  className='input-group-text' id='input1'>Date</label>
                    <input className='form-control col-sm-6' id='input2' type="text" name="paname" value={date} readOnly />
       </div>
      <h1>Channelings </h1>
     <br/>
      <div  className='input-group mb-5'>
                  
                  <div  className='input-group mb-5'>
                  <label  className='input-group-text' id='heading2'>Channeling Date</label>
                    <select className='form-control col-sm-6' name="date" value={selectedDate}  onChange={handleChange}>
                    <option value="" disabled >---Select Date---</option>
                      {doctors2
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
                    <button className='button3' onClick={() => handleEnterClick1(selectedDate)}>Enter</button>
                 
                  <label  className='input-group-text'>Channeling Doctor</label>
                    <select className='form-control col-sm-6' name="doctor" value={selectedDoctor}  onChange={handleChange}>
                    <option value="" disabled >---Select Doctor---</option>
                      {doctors1.map((doc) => (
                        <option key={doc.id} value={doc.doctorName}>
                          {doc.doctorName}
                        </option>
                      ))}
                    </select>
                    <button className='button4' onClick={() => handleEnterClick2(selectedDoctor)}>Enter</button>
                  </div>
       

        
          <h3 className='vhead' style={{marginLeft:'40%'}}>Doctor & Date History</h3>
          <table className='table table-bordered table-hover shadow container' id='table2' style={{marginLeft:'15vh'}}>
            <thead>
              <tr className='text-center'>
                <th>Channeling Id</th>
                <th>Channel Number</th>
                <th>Parent Name</th>
                <th>Child Name</th>
                <th>CHDR</th>
                <th>Doctor Name</th>
                <th> Channel Date</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
                
              </tr>
            </thead>
            <tbody className='text-center'>
              {channeling3.map(channel => (
                <tr key={channel.cha_id}
                style={{ opacity: channel.admin_status === 3 ? 0.5 : 1, pointerEvents: channel.admin_status === 3 ? 'none' : 'auto' }}>
                   <td>{channel.cha_id}</td>
                   <td>{channel.channel_number}</td>
                  <td >{channel.channeling_parent_name}</td>
                  <td>{channel.channeling_babyname}</td>
                  <td>{channel.channeling_chdr}</td>
                  <td>{channel.channeling_doctor}</td>
                  <td >{channel.channeling_doctor_date}</td>
                  <td>{channel.channeling_date}</td>
                  <td>{channel.channeling_vaccine_name}</td>
                  <td>{channel.channeling_bill}</td>
                  <td><button className='btn btn-primary' id='b1' onClick={() => handleEditClick(channel.cha_id)} >Edit</button></td>
                  <td><button className='btn btn-danger' id='b2' onClick={() => handleDeleteClick(channel.cha_id,channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='btn btn-success' id='b3'  onClick={() => handleEmailClick(channel.cha_id)}>Bill</button></td>
                </tr>
              ))}
            </tbody>
          </table><br/>
        
        
        
        
      
      <div>
        <h3 className='vhead' style={{marginLeft:'30vh'}}>Date History</h3>
      <table className='table table-bordered table-hover shadow container' style={{marginLeft:'14vh'}}>
            <thead>
              <tr className='text-center'>
                <th>Channeling Id</th>
                <th>Channel Number</th>
                <th>Parent Name</th>
                <th>Child Name</th>
                <th>CHDR</th>
                <th>Doctor Name</th>
                <th> Channel Date</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {channeling1.map(channel => (
                <tr key={channel.cha_id}
                style={{ opacity: channel.admin_status === 3 ? 0.5 : 1, pointerEvents: channel.admin_status === 3 ? 'none' : 'auto' }}>
                   <td>{channel.cha_id}</td>
                   <td>{channel.channel_number}</td>
                  <td>{channel.channeling_parent_name}</td>
                  <td>{channel.channeling_babyname}</td>
                  <td>{channel.channeling_chdr}</td>
                  <td>{channel.channeling_doctor}</td>
                  <td>{channel.channeling_doctor_date}</td>
                  <td>{channel.channeling_date}</td>
                  <td>{channel.channeling_vaccine_name}</td>
                  <td>{channel.channeling_bill}</td>
                  <td><button className='btn btn-primary' onClick={() => handleEditClick(channel.cha_id)}>Edit</button></td>
                  <td><button className='btn btn-danger' onClick={() => handleDeleteClick(channel.cha_id,channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='btn btn-success' onClick={() => handleEmailClick(channel.cha_id)}>Bill</button></td>
                  <td><button className='btn button5' style={channel.status===1?{backgroundColor:"#0000ffdb"}:{backgroundColor:"#ff2000c9"}} onClick={() => handleSubmitClick(channel.cha_id,channel)}>{channel.status === 1 ? "Done" : "Pending"}</button></td>
                </tr>
              ))}
            </tbody>
          </table><br/>
        </div>


        <div>
          <h3 className='vhead' style={{marginLeft:'15%'}}>Doctor History</h3>
      <table className='table table-bordered table-hover shadow container' style={{marginLeft:'15vh'}}>
            <thead>
              <tr className='text-center'>
                <th>Channeling Id</th>
                <th>Channel Number</th>
                <th>Parent Name</th>
                <th>Child Name</th>
                <th>CHDR</th>
                <th>Doctor Name</th>
                <th> Channel Date</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {channeling2.map(channel => (
                <tr key={channel.cha_id}
                style={{ opacity: channel.admin_status === 3 ? 0.5 : 1, pointerEvents: channel.admin_status === 3 ? 'none' : 'auto' }}>
                   <td>{channel.cha_id}</td>
                   <td>{channel.channel_number}</td>
                  <td>{channel.channeling_parent_name}</td>
                  <td>{channel.channeling_babyname}</td>
                  <td>{channel.channeling_chdr}</td>
                  <td>{channel.channeling_doctor}</td>
                  <td>{channel.channeling_doctor_date}</td>
                  <td>{channel.channeling_date}</td>
                  <td>{channel.channeling_vaccine_name}</td>
                  <td>{channel.channeling_bill}</td>
                  <td><button className='btn btn-primary' onClick={() => handleEditClick(channel.cha_id)}>Edit</button></td>
                  <td><button className='btn btn-danger' onClick={() => handleDeleteClick(channel.cha_id , channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='btn btn-success' onClick={() => handleEmailClick(channel.cha_id)} >Bill</button></td>
                  
                </tr>
              ))}
            </tbody>
          </table><br/>
        </div>

       

        <div style={{marginLeft:'45%'}}>
        <table className='table table-bordered table-hover shadow container'>
          <thead>
            <tr className='text-center'>
              <th><h3 className='vhead'>Full Count</h3></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {Object.entries(quantities).map(([itemName, quantity]) => (
              <tr key={itemName}>
                <td>
                  <ul>
                    <li className="list1">{itemName}: <input  value={quantity} readOnly /></li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
     
    </div>
  );
  
}

export default Admin_Channeling_Manage;
