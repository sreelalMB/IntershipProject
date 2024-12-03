import React from 'react';
import './Landingpage.css'; 
import img1 from "../../assests/img01.jpg";

function Landingpage() {
  return (
    <div className='landing'>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BookMyCare</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto"></ul>
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" aria-current="page" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/Admin">Admin</a></li>
                  <li><a className="dropdown-item" href="/RegistrationForm">Patient</a></li>
                  <li><a className="dropdown-item" href="/DoctorsForm">Doctor</a></li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
      
      <div className='imge'>
        <img src={img1} width={1535} height={639} alt="Hospital" />
      </div>

      {/* New content section */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Welcome to BookMyCare</h2>
          <p className="section-description">
            BookMyCare is your one-stop solution for managing healthcare appointments efficiently and conveniently. Our platform offers a seamless experience for patients, doctors, and administrators.
          </p>

          <div className="features">
            <div className="feature-card">
              <h3>For Patients</h3>
              <p>Register and book appointments with your preferred doctors. Keep track of your medical history and upcoming visits all in one place.</p>
            </div>
            
            <div className="feature-card">
              <h3>For Doctors</h3>
              <p>Manage your appointments, view patient records, and streamline your workflow with ease using our intuitive interface.</p>
            </div>
            
            <div className="feature-card">
              <h3>For Admins</h3>
              <p>Oversee the entire system, manage users, and ensure smooth operations across the platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landingpage;
