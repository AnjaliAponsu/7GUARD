import React, { useState, useEffect } from 'react'; 
import { useNavigate,useParams } from 'react-router-dom';
import Service from '../../Service/Service';

function PrescriptionEdit() {
    const{channelingID}=useParams();
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState([]);
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
            const response = await fetch(`http://localhost:8080/api/Prescription/getPrescriptionByPrescriptionID/${channelingID}`);
            const data = await response.json();
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newPrescription = {
            id:prescriptions.id,
            cha_id: prescriptions.cha_id,  
            chdr_id: prescriptions.chdr_id,        
            prescription: prescription, 
            dose: dose,
            p_time:datetime,
            p_date:date              
        };
        console.log(newPrescription);
        try {
            const response = await Service.updateprescription(prescriptions.id,newPrescription);
            alert("Success");
            resetForm(); 
            navigate(`/PrescriptionSuccess/${prescriptions.cha_id}`)
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


    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
          
            <form onSubmit={handleSubmit}>
            <h1 className='ha4'>Prescription</h1>

                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">Channeling ID :</label>
                    <div className="col-sm-8">
                    <input 
                        type="text" 
                        value={prescriptions.cha_id} 
                        required 
                        className="form-control"
                    />
                </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">CHDR ID :</label>
                    <div className="col-sm-8">
                    <input 
                        type="text" 
                        value={prescriptions.chdr_id} 
                        required 
                        className="form-control" 
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label">Prescription :</label>
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
                    <label className="col-sm-2 col-form-label">DOSE :</label>
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
                <button type="submit" className='btn vbtn mx-sm-2'>Submit</button>
                <button type="button" className='btn vbtn'>Print</button>
            </form>   
        </div>
        </div>
        </div>
    );
};

export default PrescriptionEdit;
