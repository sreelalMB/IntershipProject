import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const doctorId = localStorage.getItem("doctor_id"); // Ensure correct key for doctor ID

    useEffect(() => {
        if (doctorId) {
            console.log("Fetching appointments for Doctor ID:", doctorId);
            axios
                .get(`http://localhost:4000/appointment/${doctorId}?status=pending`)
                .then((res) => {
                    if (res.status === 201) {
                        setAppointments(res.data);
                        console.log("API Response:", res.data);
                    } else {
                        console.log("No appointments found.");
                        setAppointments([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                });
        } else {
            console.log("Doctor ID is not set in localStorage.");
        }
    }, [doctorId]);

    const approveHandler = (id) => {
        console.log(id)
        axios
            .put(`http://localhost:4000/appointment/${id}/status`, {
                status: "approved",
            })
            .then((res) => {
                if (res.status === 200) {
                    alert("Approved")
                }
            })
            .catch((error) => {
                console.error("Error approving appointment:", error);
            });

    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:4000/deleteappointment/${id}`)
        .then((res)=>{
            if(res.status === 200){
                alert("Appointment Deleted Successfully")
            }
        })


    }


    return (
        <div style={{ marginTop: "90px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <h3>Appointments</h3>
            {appointments ? (
                appointments.map((appointment) => (
                    <div key={appointment._id} className="card w-75 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">New Appointment</h5>
                            <p className="card-text">
                                <strong>Patient Name: {appointment.patient.name}</strong><br />
                                <strong>Email :</strong> {appointment.patient.email}<br />
                                <strong>Phone:</strong> {appointment.patient.phone}
                            </p>
                            <p className="card-text">
                                <strong>Date:</strong> {appointment.date}
                            </p>
                            <p className="card-text">
                                <strong>Time:</strong> {appointment.time}
                            </p>
                            <div className="">
                                <a href="#" className="btn btn-success" onClick={() => { approveHandler(appointment._id) }}>
                                    Approve
                                </a>
                                <a href="#" className="btn btn-danger ml-12" onClick={() => { deleteHandler(appointment._id) }}>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No appointments available for this doctor.</p>
            )}
        </div>
    );
}

export default Appointments;
