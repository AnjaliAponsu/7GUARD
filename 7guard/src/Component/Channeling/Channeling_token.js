import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';
import VaccineChannelingService from '../../Service/VaccineChannelingService';
import './Channeling.css'


export const Channeling_token = () => {
  const { channelingID } = useParams();
  const navigate = useNavigate();
  const [channelings, setChannelings] = useState({});
  const [doctor, setDoctor] = useState([]);
  const [time, setTime] = useState('');
  const form = useRef();

  const handleSubmit = () => navigate(`/home/${channelings.nic}`);

  useEffect(() => {
    const fetchChannelingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingID}`
        );
        if (!response.ok) throw new Error('Failed to fetch channeling data');
        const fetchedChanneling = await response.json();
        setChannelings(fetchedChanneling);
      } catch (error) {
        console.error('Error fetching channeling data:', error);
      }
    };
    fetchChannelingDetails();
  }, [channelingID]);

  useEffect(() => {
    if (channelings.channeling_doctor) {
      const fetchDoctorDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/7Guard/Doctor/getDoctor/${channelings.channeling_doctor}/${channelings.doctor_id}`
          );
          if (!response.ok) throw new Error('Failed to fetch doctor data');
          const doctorData = await response.json();
          setDoctor(doctorData);
        } catch (error) {
          console.error('Error fetching doctor data:', error);
        }
      };
      fetchDoctorDetails();
    }
  }, [channelings.channeling_doctor]);

  useEffect(() => {
    if (doctor.startTime && doctor.endTime) {
      const [startHours, startMinutes] = doctor.startTime.split(':').map(Number);
      const [endHours, endMinutes] = doctor.endTime.split(':').map(Number);

      const startTimeInMinutes = startHours * 60 + startMinutes;
      const endTimeInMinutes = endHours * 60 + endMinutes;

      if (endTimeInMinutes < startTimeInMinutes) {
        console.error('End time must be greater than start time');
        return;
      }

      const allocatedTime = 15;
      const userTime = channelings.channel_number * allocatedTime;

      const channelTimes = startTimeInMinutes + userTime;

      if (channelTimes < 0 || channelTimes > 1440) {
        console.error('Calculated time is out of bounds:', channelTimes);
        return;
      }

      const finalHours = Math.floor(channelTimes / 60);
      const finalMinutes = channelTimes % 60;

      const formattedTime = `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}:00`;
      setTime(formattedTime);
    }
  }, [doctor, channelings]);

  const sendEmail = (e) => {
    e.preventDefault();

    const channelingData = {
      cha_id: channelingID,
      ...channelings,
      arriving_time: time,
      admin_status: 2,
    };

    VaccineChannelingService.updateStatusChanneling(channelingID, channelingData);
    emailjs
      .sendForm('service_ok3d4d9', 'template_fjkdlde', form.current, 'HpUQwESjtwf1O0qN-')
      .then(
        () => {
          alert('Email sent successfully!');
          handleSubmit();
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send email. Please try again.');
        }
      );
    e.target.reset();
  };

  return (
    <div className='form20'>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21" id='Body4'>
          <h1 className='ha4'>Your Channeling Token</h1><br />
          {channelings ? (
            <form ref={form} onSubmit={sendEmail}>
              <div className='fo3'>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Reference :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message7" value={channelings.cha_id || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Token :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message5" value={channelings.channel_number || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'> Your Channeling Time :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message6" value={time} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Doctor Name :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message9" value={channelings.channeling_doctor || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'> Parent Name :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' type="text" name="user_name" value={channelings.channeling_parent_name} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Child Name :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message3" value={channelings.channeling_babyname || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2' >

                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Email :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' type="email" name="useremail" value={channelings.email} readOnly />
                  </div>
                </div>

                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling Purpose/Vaccine Name :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message2" value={channelings.channeling_vaccine_name || ''} readOnly />
                  </div>
                </div>

                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling Amount :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message1" value={channelings.channeling_bill || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Channeling date :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message4" value={channelings.channeling_doctor_date || ''} readOnly />
                  </div>
                </div>
                <div className='form-group row mb-2'>
                  <label htmlFor='impofid' className='col-sm-5 col-form-label'>Today :</label>
                  <div className='col-sm-6'>
                    <input className='form-control' name="message8" value={channelings.channeling_time || ''} readOnly />
                  </div>

                </div>
                <button className="btn vbtn" type="submit">Send Message</button>
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
