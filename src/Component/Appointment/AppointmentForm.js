import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './appointmentform.css';

const AppointmentForm = ({ onSubmit, editingAppointment }) => {
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [appointmentsPerDay, setAppointmentsPerDay] = useState("");
    const [error, setError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [doctor, setDoctor] = useState([]);  

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/getAllDoctors`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointment data');
                }
                const userData = await response.json();
                setDoctor(userData);  
            } catch (error) {
                console.error('Error fetching appointment data:', error);
            }
        };

        fetchDoctorDetails();
    }, []);
console.log("doctor",doctor)
    useEffect(() => {
        if (editingAppointment) {
            setDoctorId(editingAppointment.doctorId);
            setDoctorName(editingAppointment.doctorName);
            setAppointmentDate(editingAppointment.availableDate);
            setStartTime(editingAppointment.startTime);
            setEndTime(editingAppointment.endTime);
            setAppointmentsPerDay(editingAppointment.appointmentsPerDay);
        }
    }, [editingAppointment]);


    const handleDoctorChange = (e) => {
        const selectedDoctorId = e.target.value;
        setDoctorId(selectedDoctorId);

        const selectedDoctor = doctor.find(
            (doctor) => doctor.d_id == selectedDoctorId
        );

        if (selectedDoctor) {
            setDoctorName(selectedDoctor.docFullName);
        } else {
            setDoctorName("");
        }
    };
console.log("Doctorname",doctorName)
console.log("Doctorname",doctorName)


    const handleTimeChange = (e) => {
        const timeValue = e.target.value;
        setEndTime(timeValue);
        console.log("Selected Time (24-hour):", timeValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!doctorId || !doctorName || !appointmentDate || !startTime || !endTime || !appointmentsPerDay) {
            setError("Please fill all parts to submit.");
            return;
        }

       
        setShowConfirmation(true);
    };

    const confirmSubmit = async () => { 
    
        const newData = {
            doctorId,
            doctorName,
            availableDate: appointmentDate,
            startTime,
            endTime,
            appointmentsPerDay,
        };
    
        try {
            const response = await axios.post(`http://localhost:8080/7Guard/Doctor/add`, newData);
            console.log(response);
            console.log(newData);
            if (response.data) {
                alert("Successfully submitted!");
                navigate(`/AppointmentSuccess/${doctorId}`)
                
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('There was an error submitting the data!', error);
            alert(error.response?.data || 'Something went wrong!');
        }
        
        setShowConfirmation(false);
    
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
                <h1 className='ha4'>Add Availability Of Doctors</h1>
                
                <div className="form-group row mb-2">
                    <label htmlFor="doctorId" className="col-sm-2 col-form-label">Doctor ID:</label>
                    <div className="col-sm-8">
                    <select className="form-control dropdown-toggle" id="doctorId" value={doctorId} onChange={handleDoctorChange}>
                        <option value="">Select a doctor</option>
                        {doctor.map((doctor) => (
                            <option key={doctor.d_id} value={doctor.d_id}>
                                {doctor.d_id}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="doctorName">Doctor Name:</label>
                    <div className="col-sm-8">
                    <input className="form-control" type="text" id="doctorName" value={doctorName} disabled />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="appointmentDate">Available Date:</label>
                    <div className="col-sm-8">
                    <input
                        type="date"
                        id="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="form-control"
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="startTime">Start Time:</label>
                    <div className="col-sm-8">
                    <input
                        type="time"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="form-control"
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="endTime">End Time:</label>
                    <div className="col-sm-8">
                    <input
                        type="time"
                        id="endTime"
                        value={endTime}
                        onChange={handleTimeChange}
                        className="form-control"
                    />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <label className="col-sm-2 col-form-label" htmlFor="appointmentsPerDay">Appointments per Day:</label>
                    <div className="col-sm-8">
                        <input
                        type="number"
                        id="appointmentsPerDay"
                        value={appointmentsPerDay}
                        onChange={(e) => setAppointmentsPerDay(e.target.value)}
                        className="form-control"
                    />
                    </div>
                </div>

                {error && <p className="error">{error}</p>} {/* Display error message */}

                <button className='btn vbtn' type="submit">{editingAppointment ? "Update Appointment" : "Add Appointment"}</button>
            </form>

            

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-modal ">
                    <br/>
                    <div className='border-bottom mb-2'></div>
                    <div className="modal-content d-flex align-items-center justify-content-center">
                    
                        <p>Are you sure you want to submit this?</p>
                        
                        <Link className='btn vbtn mb-2' style={{width:'30%'}} onClick={confirmSubmit}>OK</Link>
                        <Link className='btn vbtn' style={{width:'30%'}} onClick={cancelSubmit}>Cancel</Link>
                        </div>
                    </div>
               
            )}
        </div>
        </div>
        </div>
    );
};

export default AppointmentForm;
