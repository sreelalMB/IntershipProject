import React, { useState, useEffect } from 'react';
import './Doctor.css';
import { Link } from 'react-router-dom';
import { useLocation , useNavigate } from 'react-router-dom';
import axios from 'axios';

const Doctor = () => {
    const navigate= useNavigate();
    const location = useLocation();
    const { name } = location.state || {};
    const [profile, setProfile] = useState(null);
    const [appointment, setAppointment] = useState([])
    const [doctorcount, setDoctorCount] = useState();
    const [patientcount, setPatientCount] = useState();
    const [appointmentcount, setAppointmentCount] = useState();
    const [pendingCount, setPendingCount] = useState(0);

    // const userId = localStorage.getItem("user_id");
    const doctorId = localStorage.getItem("doctor_id")

    useEffect(() => {
        if (!doctorId) {
            navigate('/doctorslogin')
            alert("Login Please.......")
        }
    }, [])

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
        axios.get(`http://localhost:4000/approvedappointment/${doctorId}?status=approved`)
            .then((res) => {
                setAppointmentCount(res.data.count)
            })
    })
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/pendingappointment/${doctorId}?status=pending`);
                setPendingCount(response.data.count);
            } catch (error) {
                console.error("Error fetching pending appointments:", error);
                setError("Failed to fetch pending appointments.");
            }
        };

        fetchPendingAppointments();
    }, [doctorId]);




    if (!profile) {
        return <div>Loading...</div>; // Added a loading state
    }
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const logoutHandler = () => {
        localStorage.removeItem("doctor_id");
        navigate('/doctorslogin')

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
                    <li className="logout-link" onClick={logoutHandler}>🚪 Log Out
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
                        <p>{patientcount}</p>
                    </div>
                    <div className="doctor-card">
                        <h3>Total Appointments</h3>
                        <p>{appointmentcount}</p>
                    </div>
                    <div className="doctor-card">
                        <h3>Pending Appointments</h3>
                        <p>{pendingCount}</p>
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
                            <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400">Time & Date: {obj.time} , {formatDate(obj.date)}</p>
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
