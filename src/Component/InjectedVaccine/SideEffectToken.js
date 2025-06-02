import { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useParams } from 'react-router-dom';


export const SideEffectToken= () => {
  const {vaccineName,email} = useParams();
  const navigate = useNavigate();
  const [sideEffects, setSideEffects] = useState([]); 
  const subject = "Santa Dora";
  const form = useRef();
 

  const handleSubmit = () => navigate("/InjectedVaccineTable");

  useEffect(() => {
    fetchSideEffects();
}, []);

const fetchSideEffects = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/side-effect/view_side_effects/${vaccineName}`);
        const data = await response.json();
        setSideEffects(data);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
    }
};


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_q726tuh', 'template_bjfqssd', form.current, 'vSHNTCaAhCfdI2ydM')
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
            <h1 className='ha4'>Vaccine Side Effects</h1>
        {sideEffects ? (
        <form ref={form} onSubmit={sendEmail}>
          
          <div className="form-group row mb-2">
          <label className="col-sm-2 col-form-label">Vaccine Name :</label>
          <div className="col-sm-8">
          <input className='form-control '  type="text" name="message3" value={sideEffects.vaccineName} readOnly />
          </div>
          </div>

          <div className='form-group row mb-2'>
          <label className='col-sm-2 col-form-label'>Email</label>
          <div className="col-sm-8">
          <input className='form-control'  type="email" name="useremail" value={email || ''} readOnly />
          </div>
          </div>

          <div className='form-group row mb-2'>
          <label className='col-sm-2 col-form-label'>Side Effects</label>
          <div className="col-sm-8">
          <input className='form-control'  name="message2" value={sideEffects.sideEffect|| ''} readOnly />
          </div>
          </div>

          <div className='form-group row mb-2'>
          <label className='col-sm-2 col-form-label'>Medications</label>
          <div className="col-sm-8">
          <input className='form-control'  name="message1" value={sideEffects.medication || ''} readOnly />
          </div>
          </div>
          
          <button className="btn vbtn"type="submit">Send Message</button>
          
        </form>
      ) : (
        <p>Loading...</p>
      )}
      
      
    </div>
    </div>
    </div>
  );
};

export default SideEffectToken;
