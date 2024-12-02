import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  VaccineChannelingService from '../Service/VaccineChannelingService';

export default function Home_Co() {
   const navigate = useNavigate();
   const { userID } = useParams();
    const [channelingId, setChannelingId] = useState(null); 
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClientClick = () => {
        navigate(`/PlaceVaccineChanneling`);
                   
    };
    const handleAdminClick = () => {
        navigate(`/AdminChannelingManage`);
                   
    };

    return (
        <div>
            <div>
                
                    
                    <div class="d-grid gap-2 col-6 mx-auto">
                         <button  onClick={handleClientClick} className="btn btn-danger" type="button" disabled={isDisabled}>Client</button>
                         <button  onClick={handleAdminClick} className="btn btn-danger"  type="button" disabled={isDisabled}>Admin</button>
                    </div>    
                </div>
            </div>
     
    );
}
