import React, { useState, useEffect } from 'react';
import './Doctor.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Doctor = () => {
    const location = useLocation();
    const { name } = location.state || {};
    const [profile, setProfile] = useState(null);
    const [appointment, setAppointment] = useState([])

    // const userId = localStorage.getItem("user_id");
    const doctorId = localStorage.getItem("doctor_id")

    useEffect(() => {
        if (doctorId) {
            axios.get(`http://localhost:4000/userprofile/${doctorId}`)
                .then((res) => setProfile(res.data.user))
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [doctorId]);

    useEffect(() => {
        axios.get(`http://localhost:4000/appointment/${doctorId}?status=approved`)
            .then((res) => {
                console.log(res.data)
                setAppointment(res.data)
            })
    }, [])

    if (!profile) {
        return <div>Loading...</div>; // Added a loading state
    }

    return (
        <div className="doctor-dashboard">
            <div className="doctor-sidebar fixed h-screen">
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
                    <li><Link to="/appointment" className="sidebar-link">📅 Appointments</Link></li>
                    <li>
                        <Link to="/" className="logout-link">🚪 Log Out</Link>
                    </li>
                </ul>
            </div>
            <div className="doctor-main-content ml-[15rem]">
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

            <div className='absolute mt-72 ml-[25rem] mb-8'>
                {
                    appointment.map((obj) =>
                        <div class="w-[50rem] p-4 text-center mt-10 mb-10 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-black">New Appointment</h5>
                            <p class=" text-base text-gray-500 sm:text-xl dark:text-gray-400">Patient :{obj.patient.name} </p>
                            <p class=" text-base text-gray-500 sm:text-lg dark:text-gray-400">Email :{obj.patient.email} </p>
                            <p class=" text-base text-gray-500 sm:text-lg dark:text-gray-400">Phone :{obj.patient.phone} </p>
                            <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">Time & Date: {obj.time} , {obj.date}</p>
                            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Doctor;
