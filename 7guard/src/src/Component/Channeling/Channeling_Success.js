import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  VaccineChannelingService from '../../Service/VaccineChannelingService';
import './Channeling.css'

export default function Channeling_Success() {
   const navigate = useNavigate();
   const { parentNic } = useParams();
    const [channelingId, setChannelingId] = useState(null); 
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        
        const fetchChannelingId = async () => {
            try {
                const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getLatestChannelingIdForUser/${parentNic}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch channeling ID');
                }
                const data = await response.json();
                setChannelingId(data.cha_id); 
            } catch (error) {
                console.error('Error fetching channeling ID:', error);
               
            }
        };

        fetchChannelingId();
    }, []);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsDisabled(true);
        },80000);
        return () => clearTimeout(timer);
    },[]);
    
    const handleEditClick = (channelingId) => navigate(`/EditVaccineChanneling/${channelingId}`);

    const handleDeleteClick = (channelingId) => {
        const confirmed = window.confirm("Do you want to delete?");
        if (confirmed) {
            VaccineChannelingService.deleteChannelingById(channelingId)
                .then(() => {
                    console.log("Order deleted");
                    navigate(`/home/${parentNic}`);
                   
                })
                .catch((error) => {
                    console.error('There was an error deleting the Channeling!', error);
                });
        } else {
            console.log("Channeling is not deleted");
        }
    };

    const handleDoneClick = () => {
        navigate(`/ChannelingToken/${channelingId}/${parentNic}`);
                   
    };

    return (
        <div className='form20'>
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-sm-8 py-2 px-5 shadow form21">
                    <p className='ha4'>Channeling</p>
                    <p className="heading_s3">You have submitted your Channelling Successfully!</p>
                    
                    <div class="d-grid gap-2 col-6 mx-auto">
                         <button  onClick={() => handleEditClick(channelingId)} className="btn vbtn" id='bt1'type="button" disabled={isDisabled}>Edit Channeling</button>
                         <button  onClick={() => handleDeleteClick(channelingId)} className="btn vbtn" id='bt2'  type="button" disabled={isDisabled}>Delete Channeling</button>
                         <button  onClick={() => handleDoneClick(channelingId,parentNic)} className="btn vbtn" id='bt3' type="button">Done channeling</button>
                    </div>    
                </div>
            </div>
        </div>
    );
}
