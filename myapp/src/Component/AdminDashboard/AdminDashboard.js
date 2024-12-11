import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const AdminDashboard = () => {
    const [doctorcount, setDoctorCount] = useState();
    const [patientcount, setPatientCount] = useState();
    const [appointmentcount, setAppointmentCount] = useState();
    useEffect(() => {
        axios.get("http://localhost:4000/doctorcount")
            .then((res) => {
                setDoctorCount(res.data)
            })
    })
    useEffect(() => {
        axios.get("http://localhost:4000/patientcount")
            .then((res) => {
                setPatientCount(res.data)
            })
    })
    useEffect(() => {
        axios.get("http://localhost:4000/appointmentcount")
            .then((res) => {
                setAppointmentCount(res.data)
            })
    })

    const navigate = useNavigate()
    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li>Dashboard</li>
                    <li onClick={() => { navigate('/AdminUserView') }} >Manage Patients</li>
                    <li onClick={() => { navigate('/AdminDoctorView') }}>Manage Doctors</li>
                    <li onClick={() => { navigate('/AdminappointmentView') }}>Appointments</li>
                    <li>
                        <Link to='/' className="logout-link">Log Out</Link>
                    </li>



                </ul>

            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Welcome, Admin</h1>
                </div>
                <div className="cards ">
                    <div className="card">
                        <h3>Total Patients</h3>
                        <p>{patientcount}</p>
                    </div>
                    <div className="card ">
                        <h3>Total Doctors</h3>
                        <p>{doctorcount}</p>
                    </div>
                    <div className="card">
                        <h3>Total Appointments</h3>
                        <p>{appointmentcount}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
