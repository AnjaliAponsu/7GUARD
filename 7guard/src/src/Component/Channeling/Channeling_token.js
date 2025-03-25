import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';
import  VaccineChannelingService from '../../Service/VaccineChannelingService';
import './Channeling.css'


export const Channeling_token = () => {
  const { channelingID} = useParams();
  const navigate = useNavigate();
  const [channelings, setChannelings] = useState({}); 
  const [doctor, setDoctor] = useState([]);
  const[time,setTime]=useState("");
 
  const subject = "7Guard";
  const form = useRef();

 const email=channelings.email;
 const parentNic=channelings.nic
  const handleSubmit = () => navigate(`/home/${parentNic}`);

  useEffect(() => {
    const fetchChannelingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingID}`);
        if (!response.ok){
          
          throw new Error('Failed to fetch Channeling data');}
        const fetchedChanneling = await response.json();
        setChannelings(fetchedChanneling);
      } catch (error) {
        
        console.error('Error fetching Channeling data:', error);
      }
    };

    fetchChannelingDetails();
  }, [channelingID]);
  console.log(channelings);

  useEffect(() => {
    if (channelings.channeling_doctor) {
      const fetchDoctorDetails = async () => {
        try {
         
          const response = await fetch(`http://localhost:8080/7Guard/Doctor/getDoctor/${channelings.channeling_doctor}/${channelings.doctor_id}`);
          
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
  }, [channelings.channeling_doctor]);
  console.log(doctor)

  useEffect(() => {
    if (doctor.startTime && doctor.endTime) {
      console.log('Start Time:', doctor.startTime);
      console.log('End Time:', doctor.endTime);
      
   
      const [startHours, startMinutes] = doctor.startTime.split(':').map(Number);
      const [endHours, endMinutes] = doctor.endTime.split(':').map(Number);
    
      
      if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
        console.error('Invalid time format');
        return; 
      }
      
      const startTimeInMinutes = startHours * 60 + startMinutes;
      const endTimeInMinutes = endHours * 60 + endMinutes;
    
      if (endTimeInMinutes < startTimeInMinutes) {
        console.error('End time must be greater than start time');
        return;
      }
    
     
      const totalAvailableTime = endTimeInMinutes - startTimeInMinutes;
      console.log('Total Available Time (minutes):', totalAvailableTime);
      
    
      const allocatedTime = 15
      const userTime = channelings.channel_number * allocatedTime; 
      
      
      const channelTimes = startTimeInMinutes + userTime;
    
    
      if (channelTimes < 0 || channelTimes > 1440) { 
        console.error('Calculated time is out of bounds:', channelTimes);
        return;
      }
      
  
      const finalHours = Math.floor(channelTimes / 60);
      const finalMinutes = channelTimes % 60;
    
    
      const formattedTime = `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}:00`;
      const totalHours = finalHours + (finalMinutes / 60);
     
  setTime(formattedTime)
      console.log('Formatted Time:', formattedTime);
      
      
      const finalTimeInDouble = channelTimes / 60; 
      console.log('Final Time as Double (hours):', finalTimeInDouble); 
    }
  }, [doctor, channelings, time]); 
 
console.log("time",time)
  const sendEmail = (e) => {
    e.preventDefault();

    const channelingData = {
      cha_id:channelingID,
      channeling_babyname: channelings.channeling_babyname,
      channeling_bill: channelings.channeling_bill,
      channeling_chdr: channelings.channeling_chdr,
      channeling_date: channelings.channeling_date,
      channeling_doctor_date: channelings.channeling_doctor_date,
      channeling_doctor: channelings.channeling_doctor,
      channeling_parent_name: channelings.channeling_parent_name,
      channeling_telephone: channelings.channeling_telephone,
      channeling_time: channelings.channeling_time,
      channeling_vaccine_name: channelings.channeling_vaccine_name,
      nic: channelings.nic,
      requested_qty: channelings.requested_qty,
      channel_number:channelings.channel_number,
      doctor_id:channelings.doctor_id,
      status: channelings.status,
      arriving_time:time,
      child_age:channelings.child_age,
      admin_status:2,
      email:channelings.email
  };
 
VaccineChannelingService.updateStatusChanneling(channelingID,channelingData);
console.log("f",channelingData)
    emailjs.sendForm('service_ok3d4d9', 'template_fjkdlde', form.current, 'HpUQwESjtwf1O0qN-')
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
          handleSubmit();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send email. Please try again.');
       
        }
      );
    e.target.reset();
  };

  return (
    <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21" id='Body4'>
        <h1 className='ha4'>Your Channeling Token</h1><br/>
      {channelings ? (
        <form ref={form} onSubmit={sendEmail}>
        <div className='fo3'>
        <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Reference :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message7" value={ channelings.cha_id|| ''} readOnly />
          </div>
          </div>
        <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Token :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message5" value={ channelings.channel_number|| ''} readOnly />
          </div>
          </div>
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Time :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message6" value={ time} readOnly />
          </div>
          </div>
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Doctor Name :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message9" value={channelings.channeling_doctor|| ''} readOnly />
          </div>
          </div>  
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'> Parent Name :</label>
          <div className='col-sm-6'>
          <input  className='form-control' type="text" name="user_name" value={channelings.channeling_parent_name} readOnly />
          </div>
</div>
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Child Name :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message3" value={channelings.channeling_babyname || ''} readOnly />
          </div>  
</div>
          <div className='form-group row mb-2' >
         
          <label  htmlFor='impofid' className='col-sm-5 col-form-label'>Email :</label>
          <div className='col-sm-6'>
          <input className='form-control'  type="email" name="useremail"value={email}  readOnly />
          </div>
          </div>
          
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling Purpose/Vaccine Name :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message2" value={channelings.channeling_vaccine_name|| ''} readOnly />
          </div>
          </div>
          
            <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling Amount :</label>
          <div className='col-sm-6'>
          <input className='form-control'  name="message1" value={channelings.channeling_bill || ''} readOnly />
          </div>
          </div>
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling date :</label>
          <div className='col-sm-6'>
          <input className='form-control' name="message4" value={channelings.channeling_doctor_date || ''} readOnly />
          </div>
          </div>
          <div className='form-group row mb-2'>
          <label   htmlFor='impofid' className='col-sm-5 col-form-label'>Today :</label>
          <div className='col-sm-6'>
          <input className='form-control' name="message8" value={channelings.channeling_time || ''} readOnly />
          </div>
          
          </div>
          <button  className="btn vbtn"type="submit">Send Message</button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      
      </div>
      </div>
      </div>
  );
};

export default Channeling_token;
