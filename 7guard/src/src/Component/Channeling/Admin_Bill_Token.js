import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';
import './Channeling.css'


export const Admin_Bill_Token = () => {
  const { channelingID} = useParams();
  const navigate = useNavigate();
  const [channelings, setChannelings] = useState(''); 
  const subject = "You have Successfully paid your payment";
  const form = useRef();
 


  const handleSubmit = () => navigate(`/AdminChannelingManage`);

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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ok3d4d9', 'template_7e6586k', form.current, 'HpUQwESjtwf1O0qN-')
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
        <div className="col-sm-8 py-2 px-5 shadow form21" id='Body6'>
        <h1 className='vhead'>Your Channeling Confirmation</h1>
      {channelings ? (
        <form ref={form} onSubmit={sendEmail}>
        <div className='fo3'>
          
        <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label"> Your Channeling Reference :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message7" value={ channelings.cha_id|| ''} readOnly />
          </div>
          </div>

        <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label"> Your Channeling Token :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message5" value={ channelings.channel_number|| ''} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label">Channeling Time :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message6" value={channelings.arriving_time || ''} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label">Channeling date :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6' name="message4" value={channelings.channeling_doctor_date || ''} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label"> Doctor Name :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message9" value={ channelings.channeling_doctor|| ''} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label"> Parent Name :</label>
          <div className="col-sm-7">
          <input  className='form-control col-sm-6' type="text" name="user_name" value={channelings.channeling_parent_name} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label">Child Name :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message3" value={channelings.channeling_babyname || ''} readOnly />
          </div>  
          </div>  

          <div className='input-group row mb-2' >
          <label className="col-sm-5 col-form-label">Email :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  type="email" name="useremail" value={channelings.email|| ''} readOnly />
          </div>
          </div>
       
          <div className='input-group row mb-2'>
          <label className="col-sm-6 col-form-label">Channeling Purpose/Vaccine Name :</label>
          <div className="col-sm-6">
          <input className='form-control col-sm-6'  name="message2" value={channelings.channeling_vaccine_name|| ''} readOnly />
          </div>
          </div>

            <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label">Channeling Amount :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6'  name="message1" value={channelings.channeling_bill || ''} readOnly />
          </div>
          </div>

          <div className='input-group row mb-2'>
          <label className="col-sm-5 col-form-label">Today :</label>
          <div className="col-sm-7">
          <input className='form-control col-sm-6' name="message8" value={channelings.channeling_time || ''} readOnly />
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

export default Admin_Bill_Token ;
