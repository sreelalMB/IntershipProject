import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAppointmentViews() {
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/appointmentview")
            .then((res) => {
                console.log(res.data);
                setAppointment(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    // Function to format the date
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient Name</th>
                            <th>Patient Email</th>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointment.map((obj, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{obj.patient.name}</td>
                                    <td>{obj.patient.email}</td>
                                    <td>{obj.doctor.name}</td>
                                    <td>{obj.doctor.specialization}</td>
                                    <td>{obj.time}</td>
                                    <td>{formatDate(obj.date)}</td> {/* Format the date here */}
                                    <td>{obj.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAppointmentViews;
