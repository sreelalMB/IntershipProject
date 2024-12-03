import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    // const Docid = localStorage.getItem('Docid');
    const patient = localStorage.getItem("user_id");
    useEffect(() => {
        const doctorId = localStorage.getItem('user_id');
        console.log('Doctor ID from localStorage:', doctorId);// Ensure the ID is set properly when booking
        if (doctorId) {
            axios.get(`http://localhost:4000/appointment/${doctorId}`)
                .then((res) => {
                    if (res.status === 200) {
                        setAppointments(res.data);
                        console.log('Appointments data:', res.data);
                      
                    } else {
                        console.log('No appointments found.');
                    }
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                });
        }
    }, []);
    // Added Docid to dependency array to refetch if it changes

    return (
        <div style={{ marginTop: "90px", display: 'flex', justifyContent: 'center' }}>
            {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                    <div className="card w-75">
                        <div className="card-body" key={i}>
                            <h5 className="card-title">New Appointment</h5>
                             <p className="card-text"><strong>Patient Name:</strong> {appointment.patient.name}</p> 
                            <p className="card-text"><strong>Date:</strong> {appointment.date}</p>
                            <p className="card-text"><strong>Time:</strong> {appointment.time}</p>
                            <a href="#" className="btn btn-primary">Details</a>
                        </div>
                    </div>
                ))
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
}

export default Appointments;
