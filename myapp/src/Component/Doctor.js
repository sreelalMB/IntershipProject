import React, { useState, useEffect } from 'react';
import './Doctor.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Doctor = () => {
    const location = useLocation();
    const { name } = location.state || {};
    const [profile, setProfile] = useState(null);

    const userId = localStorage.getItem("user_id");
    const doctorId=localStorage.getItem("DoctorId")

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:4000/userprofile/${userId}`)
                .then((res) => setProfile(res.data.user))
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [userId]);

    if (!profile) {
        return <div>Loading...</div>; // Added a loading state
    }

    return (
        <div className="doctor-dashboard">
            <div className="doctor-sidebar">
                <h2 >Doctor Dashboard</h2>
                <ul>
                    <img 
                        src={profile.img ? `http://localhost:4000${profile.img}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCexwutNZt0aSRMrVRLoXtex8XMNyWxjD4Q&s'} 
                        class="rounded-top" 
                        style={{ width: "170px" }} 
                        alt="Doctor profile" 
                    />
                    <li><Link to="/home" className="sidebar-link">🏠 Home</Link></li>
                    <li><Link to="/DoctorProfile" className="sidebar-link">👤 Profile</Link></li>
                    <li><Link to="/users" className="sidebar-link">👥 Users</Link></li>
                    <li><Link to="/appointment" className="sidebar-link">📅 Appointments</Link></li>
                    <li>
                        <Link to="/" className="logout-link">🚪 Log Out</Link>
                    </li>
                </ul>
            </div>
            <div className="doctor-main-content">
                <header className="doctor-header">
                    <h1 className='msg'>Welcome, {profile.name}</h1>
                </header>
                <div className="doctor-cards">
                    <div className="doctor-card">
                        <h3>Total Patients</h3>
                        <p>150</p>
                    </div>
                    <div className="doctor-card">
                        <h3>Total Appointments</h3>
                        <p>30</p>
                    </div>
                    <div className="doctor-card">
                        <h3>Pending Appointments</h3>
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctor;
