import React from 'react';

function AppointmentRow({ row, onEdit }) {
    return (
        <tr>
            <td>{row.doctorName}</td>
            <td>{row.availableDate}</td>
            <td>{row.startTime}</td>
            <td>{row.endTime}</td>
            <td>{row.appointmentsPerDay}</td>
            <td>
                {/* Check if the user is an admin */}
                <button onClick={onEdit}>Edit</button>
            </td>
        </tr>
    );
}

export default AppointmentRow;
