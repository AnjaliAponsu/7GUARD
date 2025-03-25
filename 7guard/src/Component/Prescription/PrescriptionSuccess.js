import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../Channeling/Channeling.css'
import Service from '../../Service/Service';

export default function PrescriptionSuccess() {
    const navigate = useNavigate();
    const { channelingId } = useParams();
    const [channelingID, setChannelingID] = useState(null); 
    const [email, setEmail] = useState(''); 
    const [nic, setNic] = useState('');
    const[id,setId]=useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        
        const fetchPrescriptionId = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/Prescription/getLatestPrescriptionId/${channelingId}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch channeling ID');
                }
                const data = await response.json();
               
                setChannelingID(data.id); 
                setId(data.cha_id)
            } catch (error) {
                console.error('Error fetching channeling ID:', error);
               
            }
        };

        fetchPrescriptionId();
    }, []);
console.log("id",nic)

useEffect(() => {
        
    const fetchChannelingId = async () => {
        try {
            console.log("fe",id)
            const response = await fetch(`http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${id}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch channeling ID');
            }
            const data = await response.json();
            setNic(data.nic)
           
        } catch (error) {
            console.error('Error fetching channeling ID:', error);
           
        }
    };

    fetchChannelingId();
}, [id]);




useEffect(() => {
        const fetchParentDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/v1/getParentByParentNIC/${nic}`);
            if (!response.ok) {
              throw new Error('Failed to fetch parent data');
            }
            const userData = await response.json();
            setEmail(userData.p_email);
       
          } catch (error) {
            console.error('Error fetching parent data:', error);
          }
        };
    
        fetchParentDetails();
      }, [nic]);

  
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsDisabled(true);
        },80000);
        return () => clearTimeout(timer);
    },[]);
    

    const handleEditClick = (channelingID) => navigate(`/PrescriptionEdit/${channelingID}`);

    const handleDeleteClick = (channelingID) => {
        const confirmed = window.confirm("Do you want to delete?");
        if (confirmed) {
           Service.deletePrescriptiongById(channelingID)
                .then(() => {
                    console.log("Precription deleted");
                    navigate(`/PrescriptionTable`);
                   
                })
                .catch((error) => {
                    console.error('There was an error deleting the Prescription!', error);
                });
        } else {
            console.log("Prescription is not deleted");
        }
    };
console.log("email",email)
    const handleDoneClick = () => {
        navigate(`/PrescriptionDone/${channelingID}/${email}`);
                   
    };

    return (
        <div className='form20'>
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-sm-8 py-2 px-5 shadow form21">
                    <p className='ha4'>Prescription</p>
                    <p className="heading_s3">You have submitted your Prescription Successfully!</p>
                    
                    <div class="d-grid gap-2 col-6 mx-auto">
                         <button  onClick={() => handleEditClick(channelingID)} className="btn vbtn" id='bt1'type="button" disabled={isDisabled}>Edit Prescription</button>
                         <button  onClick={() => handleDeleteClick(channelingID)}className="btn vbtn" id='bt2'  type="button" disabled={isDisabled}>Delete Prescription</button>
                         <button  onClick={() => handleDoneClick(channelingID,email)} className="btn vbtn" id='bt3' type="button">Done Prescription</button>
                    </div>    
                </div>
            </div>
        </div>
    );
}
