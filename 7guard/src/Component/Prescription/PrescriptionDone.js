import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';


export const PrescriptionDone= () => {
  const {channelingID,email} = useParams();
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]); 
  const subject = "Santa Dora";
  const form = useRef();
 
console.log("email",email)
  const handleSubmit = () => navigate("/PrescriptionTable");

  useEffect(() => {
    fetchPrescriptions();
}, []);

const fetchPrescriptions = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/Prescription/getPrescriptionByPrescriptionID/${channelingID}`);
        const data = await response.json();
        setPrescriptions(data);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
    }
};


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_q726tuh', 'template_xznkhpx', form.current, 'vSHNTCaAhCfdI2ydM')
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
        <div className="col-sm-8 py-2 px-5 shadow form21">
            <h1 className='ha4'>Prescription</h1>
        {prescriptions ? (
        <form ref={form} onSubmit={sendEmail}>
          
          <div className="input-group mb-2">
          <label className="col-sm-2 col-form-label">Name :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  type="text" name="user_name" value={subject} readOnly />
          </div>
          </div>

          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>Email :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  type="email" name="useremail" value={email || ''} readOnly />
          </div>
          </div>

          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>Channeling Id :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  name="message1" value={prescriptions.cha_id || ''} readOnly />
          </div>
          </div>

          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>CHDR Id :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  name="message4" value={prescriptions.chdr_id || ''} readOnly />
          </div>
          </div>
          
          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>Prescription :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  name="message2" value={prescriptions.prescription || ''} readOnly />
          </div>
          </div>

          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>Dose :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  name="message3" value={prescriptions.dose || ''} readOnly />
          </div>
          </div>

          <div className='input-group mb-2'>
          <label className='col-sm-2 col-form-label'>Date :</label>
          <div className="col-sm-8">
          <input className='form-control col-sm-6'  name="message5" value={prescriptions.p_date || ''} readOnly />
          </div>
          </div>
          
          <button  className="btn vbtn"type="submit">Send Message</button>
          
        </form>
      ) : (
        <p>Loading...</p>
      )}
      
      
    </div>
    </div>
    </div>
  );
};

export default PrescriptionDone;
