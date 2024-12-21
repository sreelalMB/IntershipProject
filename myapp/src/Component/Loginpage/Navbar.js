import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import img1 from '../../assests/img12.jpeg';
import img2 from '../../assests/img13.jpg';
import img3 from '../../assests/img14.avif';
import { useNavigate } from "react-router-dom";
const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    image: img1,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Dermatologist",
    image: img2,
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialization: "Pediatrician",
    image: img3,
  },
];

const Navbar = () => {
  const navigate = useNavigate()
  const userid = localStorage.getItem("userid")
  useEffect(() => {
    if (!userid) {
      alert("Login First")
      navigate('/loginpage')

    }

  }, [])

  const logoutHandler =()=>{
    localStorage.removeItem("userid")
    navigate('/loginpage')
  }
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <p className="text-3xl font-bold text-white" href="#">BookMyCare</p>
        </div>
        <ul className="navbar-links">
          <li><Link to="/Navbar">Home</Link></li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/Bookappointment">Book Appointment</Link></li>
          <li><Link to="/MyAppointment">My Appointment</Link></li>
          <Link to="/Patients" className="profile-icon">
            <i className="fas fa-user-circle"></i> {/* Profile icon */}
          </Link>
          <li> <i className="fas fa-power-off" size="lg" style={{ color: "#f5390a", }} onClick={logoutHandler}/>
          </li>
        </ul>
      </nav>

      <div className="welcome-sectionn">
        <h1>Welcome, </h1>
        <p>We’re here to help you manage your healthcare easily and efficiently.</p>

        <div className="bin">
          <h3>Meet Our Doctors</h3>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-cardd">
                <img
                  className="doctor-image"
                  src={doctor.image}
                  alt={doctor.name}
                  style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                />
                <h4>{doctor.name}</h4>
                <p>{doctor.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Content Below */}
      <section className="aboutt-section">
        <h2>About BookMyCare</h2>
        <p>
          BookMyCare is your one-stop platform for managing your healthcare needs.
          Our mission is to connect patients with top-rated doctors for seamless and efficient care.
          Whether you're booking appointments, accessing medical records, or seeking advice, we’re here to help.
        </p>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <ul>
          <li>Online Appointment Booking</li>
          <li>Access to Medical Records</li>
          <li>24/7 Customer Support</li>
          <li>Specialist Consultations</li>
          <li>Health Tips and Resources</li>
        </ul>
      </section>

      <section className="testimonials-section">
        <h2>What Our Patients Say</h2>

        <div className="testimonials">
          <div className="testimonial">

            <p>"BookMyCare made it so easy to book an appointment with a specialist. Highly recommend!"</p>
            <p>- Sarah L.</p>
          </div>
          <div className="testimonial">
            <p>"Fantastic platform! I could access my medical records in just a few clicks."</p>
            <p>- Mark P.</p>
          </div>
        </div>

      </section>

      <footer className="footer">
        <p>&copy; 2024 BookMyCare. All rights reserved.</p>
        <p><Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link></p>
      </footer>
    </div >
  );
};

export default Navbar;