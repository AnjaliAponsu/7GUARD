import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './appointmentform.css';

export default function AppointmentSuccess() {
   const navigate = useNavigate();
   const { doctorId } = useParams();
    const [appointmentId, setAppointmentId] = useState(null); 
    const [id, setId] = useState(''); 
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        
        const fetchAppointmentId = async () => {
            try {
                const response = await fetch(`http://localhost:8080/7Guard/Doctor/getLatestAppointmentId/${doctorId}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch channeling ID');
                }
                const data = await response.json();
                setAppointmentId(data.id); 
                setId(data.doctorId)
            } catch (error) {
                console.error('Error fetching channeling ID:', error);
               
            }
        };

        fetchAppointmentId();
    }, []);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsDisabled(true);
        },80000);
        return () => clearTimeout(timer);
    },[]);
    
    const handleEditClick = (appointmentId) => navigate(`/edit-appointments/${appointmentId}/${id}`);

    const handleDeleteClick = (appointmentId) => {
        const confirmed = window.confirm("Do you want to delete?");
        if (confirmed) {
             axios.delete(`http://localhost:8080/7Guard/Doctor/delete/${appointmentId}`)
                .then(() => {
                    console.log("Appointment deleted");
                    navigate(`/appointments`);
                   
                })
                .catch((error) => {
                    console.error('There was an error deleting the appointment!', error);
                });
        } else {
            console.log("Appointment is not deleted");
        }
    };

    const handleDoneClick = () => {
        navigate(`/appointments`);
                   
    };

    return (
        <div className='form20'>
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-sm-8 py-2 px-5 shadow form21">
                    <p className='ha4'>Appointment</p>
                    <p className="heading_s3">You have submitted your Doctor Availability Successfully!</p>
                    
                    <div class="d-grid gap-2 col-6 mx-auto">
                         <button  onClick={() => handleEditClick(appointmentId,id)} className="btn vbtn" id='bt1'type="button" disabled={isDisabled}>Edit Appointment</button>
                         <button  onClick={() => handleDeleteClick(appointmentId)}className="btn vbtn" id='bt2'  type="button" disabled={isDisabled}>Delete Appointment</button>
                         <button  onClick={() => handleDoneClick()} className="btn vbtn" id='bt3' type="button">Done Appointment</button>
                    </div>    
                </div>
            </div>
        </div>
    );
}
