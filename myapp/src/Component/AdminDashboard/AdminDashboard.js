import React from 'react';
import './AdminDashboard.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Manage Patients</li>
                    <li>Manage Doctors</li>
                    <li>Appointments</li>
                    <li>

                   
                  <Link to ='/' className="logout-link">Log Out</Link> 
                </li>
                    
                    
                    
                </ul>
                
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Welcome, Admin</h1>
                </div>
                <div className="cards">
                    <div className="card">
                        <h3>Total Patients</h3>
                        <p>350</p>
                    </div>
                    <div className="card">
                        <h3>Total Doctors</h3>
                        <p>50</p>
                    </div>
                    <div className="card">
                        <h3>Pending Appointments</h3>
                        <p>12</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default AdminDashboard;
