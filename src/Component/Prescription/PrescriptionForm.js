import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Service from '../../Service/Service';

function PrescriptionForm() {
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState([]);
    const [channeling, setChanneling] = useState([]);
    const [channelingId, setChannelingId] = useState('');
    const [chdrId, setChdrId] = useState('');
    const [prescription, setPrescription] = useState('');
    const [dose, setDose] = useState('');
    const [editableData, setEditableData] = useState({});
    const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/Prescriptions');
            const data = await response.json();
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newPrescription = {
            cha_id: channelingId,  
            chdr_id: channeling.channeling_chdr,        
            prescription: prescription, 
            dose: dose,
            p_time:datetime,
            p_date: date            
        };
        console.log(newPrescription);
        try {
            const response = await Service.submitprescription(newPrescription);
            alert("Success");
            resetForm(); 
            navigate(`/PrescriptionSuccess/${channelingId}`)
        } catch (error) {
            console.error("Submission failed:", error); 
            alert("Error: Could not submit the prescription");
        }
    };

    const resetForm = () => {
        setChannelingId('');
        setChdrId('');
        setPrescription('');
        setDose('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleEnterClick = async (channelingId) => {
        
       
        if (channelingId) {
          try {
            const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${channelingId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch channeling data');
            }
            const userData = await response.json();
            setChanneling(userData);
          } catch (error) {
            console.error('Error fetching channeling data:', error);
          }
        };
    
      }
console.log("channeling",channeling)
    

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
            
            <form onSubmit={handleSubmit} className="form-inline">
            <h1 className='vhead'>Prescription</h1>

            <div class="row">
              <div class="col">
                <div className="input-group mb-2">
                    <label className="col-sm-2 col-form-label">Channeling ID:</label>
                    <div className="col-sm-8">
                    <input 
                         type="text" 
                         value={channelingId} 
                         onChange={(e) => setChannelingId(e.target.value)} 
                         required 
                         className="form-control"/>
                    </div>
                </div>
                
                <div class="col">
                        <button type='button' className='btn vbtn mb-2' onClick={() => handleEnterClick(channelingId)}>Enter</button>
                        </div>
              </div>
            </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">CHDR ID:</label>
                    <div className="col-sm-8">
                        <input 
                        type="text" 
                        value={channeling.channeling_chdr} 
                        required 
                        className="form-control" 
                    />
                </div>
                </div>

                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">Prescription:</label>
                    <div className="col-sm-8">
                        <textarea
                        type="text" 
                        value={prescription} 
                        onChange={(e) => setPrescription(e.target.value)} 
                        required 
                        className="form-control" 
                    />
                </div>
                </div>
                
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">DOSE:</label>
                    <div className="col-sm-8">
                        <textarea 
                        type="text" 
                        value={dose} 
                        onChange={(e) => setDose(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                </div>
                
                <button 
                    type="submit" 
                    className='btn vbtn'>
                    Submit
                </button>
                </form>
        </div>
        </div>
        </div>
    );
};

export default PrescriptionForm;
