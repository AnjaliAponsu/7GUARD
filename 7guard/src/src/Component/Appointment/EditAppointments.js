import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './appointmentform.css';

const EditAppointments = () => {
    const { appointmentId,id } = useParams();
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [appointmentsPerDay, setAppointmentsPerDay] = useState("");
    const [error, setError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [appointments, setAppointments] = useState({
        doctorId: "",
        doctorName: "",
        availableDate: "",
    });

 
    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/7Guard/Doctor/getAppointmentById/${appointmentId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch appointment data");
                }
                const userData = await response.json();
                setAppointments(userData);

               
                setStartTime(userData.startTime || "");
                setEndTime(userData.endTime || "");
                setAppointmentsPerDay(userData.appointmentsPerDay || "");
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchAppointmentDetails();
    }, [appointmentId]);

    const handleTimeChange = (e) => {
        const timeValue = e.target.value;
        setEndTime(timeValue);
        console.log("Selected Time (24-hour):", timeValue);
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!startTime || !endTime || !appointmentsPerDay) {
            setError("Please fill all parts to submit.");
            return;
        }

 
        setShowConfirmation(true);
    };

    const confirmSubmit = async () => {
        const newData = {
            id: appointments.id,
            doctorId: appointments.doctorId,
            doctorName: appointments.doctorName,
            availableDate: appointments.availableDate,
            startTime,
            endTime,
            appointmentsPerDay,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/7Guard/Doctor/updateAppointmentByID/${appointmentId}`,
                newData
            );
            if (response.data) {
                alert("Successfully submitted!");
                navigate(`/AppointmentSuccess/${appointments.doctorId}`);
            } else {
                alert("Submission failed!");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert(error.response?.data || "Something went wrong!");
        }

        setShowConfirmation(false);
    };

    const cancelSubmit = () => {
        setShowConfirmation(false);
    };

    return (
        <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-sm-8 py-2 px-5 shadow form21">
            <form onSubmit={handleSubmit}>
                <h1 className='ha4'>Edit Doctor's Availability</h1>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="doctorId">Doctor ID:</label>
                    <div className="col-sm-8">
                    <input className="form-control" type="text" id="doctorId" value={appointments.doctorId || ""} disabled />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="doctorName">Doctor Name:</label>
                    <div className="col-sm-8">
                    <input className="form-control" type="text" id="doctorName" value={appointments.doctorName || ""} disabled />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="appointmentDate">Available Date:</label>
                    <div className="col-sm-8">
                    <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        value={appointments.availableDate || ""}
                        readOnly
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="startTime">Start Time:</label>
                    <div className="col-sm-8">
                    <input
                        className="form-control"
                        type="time"
                        id="startTime"
                        value={startTime || ""}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="endTime">End Time:</label>
                    <div className="col-sm-8">
                    <input
                        type="time"
                        className="form-control"
                        id="endTime"
                        value={endTime || ""}
                        onChange={handleTimeChange}
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="appointmentsPerDay">Appointments per Day:</label>
                    <div className="col-sm-8">
                    <input
                        type="number"
                        className="form-control"
                        id="appointmentsPerDay"
                        value={appointmentsPerDay || ""}
                        onChange={(e) => setAppointmentsPerDay(e.target.value)}
                    />
                    </div>
                </div>

                {error && <p className="error">{error}</p>}

                <button className='btn vbtn' type="submit">Update Appointment</button>
            </form>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <br/>
                    <div className='border-bottom mb-2'></div>
                    <div className="modal-content d-flex align-items-center justify-content-center">
                        <p>Are you sure you want to submit this?</p>
                        <button className='btn vbtn mb-2' style={{width:'30%'}} onClick={confirmSubmit}>OK</button>
                        <button className='btn vbtn mb-2' style={{width:'30%'}} onClick={cancelSubmit}>Cancel</button>
                    </div>
                </div>
                
            )}
        </div>
        </div>
        </div>
    );
};

export default EditAppointments;
