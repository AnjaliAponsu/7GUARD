import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NurseNavBar from '../../../Component/Nav/NurseNavBar';

const VaccineReminder = () => {
    const [reminder, setReminders] = useState([]);
    const [reminderDetails, setReminderDetails] = useState({
        chdr_id: '',
        scan_result: '',
        vaccine_name: '',
        weeks: '',
        email: '',
        Status:'',
        vaccine_date:'',
        
    });
    const [deleteMessage, setDeleteMessage] = useState(''); //delete confirmation

    // Fetch rooms from the backend
    const fetchReminders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reminder/viewallreminder`);
            console.log('Fetched reminders:', response.data);
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };
console.log(reminder)
    useEffect(() => {
        fetchReminders();
    }, []);

    // Handle input changes for room details
    const handleChange = (e) => {
        setReminderDetails({ ...reminderDetails, [e.target.name]: e.target.value });
    };

    const LoadTable =async () => {
        try {
            await axios.get(`http://localhost:8080/reminder/fetch-and-save`);
            console.log("successfully set table")
        } catch (error) {
            console.error('Error Reminder:', error);
        }
                   
    };

    // Delete room
    const deleteRoom = async (chdrId) => {
        try {
            await axios.delete(`http://localhost:8080/reminder/deletereminder/${chdrId}`);
            console.log('Reminder deleted:', chdrId);
            setDeleteMessage(`Reminder with ID ${chdrId} has been deleted successfully.`); // Set delete message
            fetchReminders();
            setTimeout(() => setDeleteMessage(''), 5000); // Clear message after 5 seconds
        } catch (error) {
            console.error('Error deleting Reminder:', error);
        }
    };
    
    const sendReminder = async (chdrId) => {
        try {
            const response = await axios.post(`http://localhost:8080/send-email/${chdrId}`);
            console.log(response.data);
            // Display email sent confirmation
            alert('Email Can not send.');// Refresh reminders in case email count updates
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Email Send Successfully.');
        }
    };

    return (
        <div>
            <NurseNavBar/>
            <section>
                <button className="btn vbtn" style={{marginTop:'2%',marginBottom:'3%'}}onClick={()=>LoadTable()}>Set Table</button>
            <h1>Vaccine Reminder</h1>

            {/* Display delete message if available */}
            {deleteMessage && <p className="delete-message">{deleteMessage}</p>}

            {reminder.length > 0 ? (
                <table className='table table-bordered table-hover shadow container'>
                    <thead>
                        <tr className='text-center'>
                            <th>CHDR ID</th>
                            
                            <th>Vaccine Name</th>
                            <th>Vaccine Weeks</th>
                            <th>Email</th>
                            <th>Vaccine_Date</th>
                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {reminder.map((reminder) => (
                            <tr key={reminder.chdr_id}>
                                <td>{reminder.chdrID}</td>
                                
                                <td>{reminder.vaccineName}</td>
                                <td>{reminder.impofWeekRange}</td>
                                <td>{reminder.email}</td>
                                <td>{reminder.scanDate}</td>
                               
                                
                                <td>
                                    <button className="btn btn-primary mx-sm-2"onClick={() => sendReminder(reminder.id)}>Email</button>
                                    <button className="btn btn-danger" onClick={() => deleteRoom(reminder.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reminders available.</p>
            )}
            </section>
        </div>
    );
};



export default VaccineReminder;
