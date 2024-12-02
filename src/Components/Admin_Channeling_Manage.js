import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  VaccineChannelingService from '../Service/VaccineChannelingService';
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
       <div  className='input-group mb-5'>
                  <label  className='input-group-text' id='input1'>Date</label>
                    <input className='form-control col-sm-6' id='input2' type="text" name="paname" value={date} readOnly />
                  </div>
      <h1 className="heading3">Channelings </h1>
     
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
       
        
        <div >
          <h3 className='table1'>Doctor & Date History</h3>
          <table className='table table-bordered table-hover shadow' id='table2'>
            <thead>
              <tr>
                <th className="th_1">Channeling Id</th>
                <th className="th_1">Channel Number</th>
                <th className="th_1">Parent Name</th>
                <th className="th_1">Child Name</th>
                <th className="th_1">CHDR</th>
                <th className="th_1">Doctor Name</th>
                <th className="th_1"> Channel Date</th>
                <th className="th_1">Date</th>
                <th className="th_1">Purpose</th>
                <th className="th_1">Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
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
                  <td><button className='button5' id='b1' onClick={() => handleEditClick(channel.cha_id)} >Edit</button></td>
                  <td><button className='button6' id='b2' onClick={() => handleDeleteClick(channel.cha_id,channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='button5' id='b3'  onClick={() => handleEmailClick(channel.cha_id)}>Bill</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        
      
      <div>
        <h3 className='table1'>Date History</h3>
      <table className='table table-bordered table-hover shadow'>
            <thead>
              <tr>
                <th className="th_1">Channeling Id</th>
                <th>Channel Number</th>
                <th className="th_1">Parent Name</th>
                <th className="th_1">Child Name</th>
                <th className="th_1">CHDR</th>
                <th className="th_1">Doctor Name</th>
                <th className="th_1"> Channel Date</th>
                <th className="th_1">Date</th>
                <th className="th_1">Purpose</th>
                <th className="th_1">Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
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
                  <td><button className='button5' onClick={() => handleEditClick(channel.cha_id)}>Edit</button></td>
                  <td><button className='button6' onClick={() => handleDeleteClick(channel.cha_id,channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='button5' onClick={() => handleEmailClick(channel.cha_id)}>Bill</button></td>
                  <td><button className='button7' onClick={() => handleSubmitClick(channel.cha_id,channel)}>{channel.status === 1 ? "Done" : "Pending"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className='table1'>Doctor History</h3>
      <table className='table table-bordered table-hover shadow'>
            <thead>
              <tr>
                <th className="th_1">Channeling Id</th>
                <th className="th_1">Channel Number</th>
                <th className="th_1">Parent Name</th>
                <th className="th_1">Child Name</th>
                <th className="th_1">CHDR</th>
                <th className="th_1">Doctor Name</th>
                <th className="th_1"> Channel Date</th>
                <th className="th_1">Date</th>
                <th className="th_1">Purpose</th>
                <th className="th_1">Total Amount</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
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
                  <td><button className='button5' onClick={() => handleEditClick(channel.cha_id)}>Edit</button></td>
                  <td><button className='button6' onClick={() => handleDeleteClick(channel.cha_id , channel)}disabled={channel.admin_status === 3}>Delete</button></td>
                  <td><button className='button5' onClick={() => handleEmailClick(channel.cha_id)} >Bill</button></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <table >
          <thead>
            <tr>
              <th><h3 className='table1'>Full Count</h3></th>
             
            </tr>
          </thead>
          <tbody>
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
  );
  
}

export default Admin_Channeling_Manage;
