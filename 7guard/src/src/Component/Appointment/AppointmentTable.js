import React, { useEffect, useState } from 'react';
import './appointmentform.css';
import DoctorNavBar from "../Nav/DoctorNavBar"
import { Link } from 'react-router-dom';
import { left } from '@popperjs/core';
import ReceptionistNavBar from '../Nav/ReceptionistNavBar';

function AppointmentTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [appointments, setAppointments] = useState([]);  

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/7Guard/Doctor/all`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointment data');
                }
                const userData = await response.json();
                setAppointments(userData);  
            } catch (error) {
                console.error('Error fetching appointment data:', error);
            }
        };

        fetchAppointmentDetails();
    }, []);

 
    const filteredData = appointments.filter((appointment) =>
        appointment.availableDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <ReceptionistNavBar/>
        <div className="appointment-table">
            <h1>Availability</h1>
            <Link className='btn vbtn mb-2' to={'/a'}>Add Appointment</Link>
            <div className="search">
            <input
                type="text"
                placeholder="Search by date"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{width:'25%', height:'40px', borderRadius:'5px'}}

            />
            </div>
            <br/>
            {filteredData.length > 0 ? (
                <table className='table table-bordered table-hover shadow container'>
                    <thead>
                        <tr className='text-center'>
                            <th>Doctor ID</th>
                            <th>Doctor Name</th>
                            <th>Available Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Appointments per Day</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {filteredData.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.doctorId}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.availableDate}</td>
                                <td>{appointment.startTime}</td>
                                <td>{appointment.endTime}</td>
                                <td>{appointment.appointmentsPerDay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointments found for the given search criteria.</p>
            )}
        </div>
        </div>
    );
}

export default AppointmentTable;
