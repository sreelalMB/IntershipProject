import React, { useState } from 'react';
import './DoctorsLogin.css'; // Updated to the new CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorsLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (API call, etc.)
    axios.post("http://localhost:4000/doclogin", {
      email,
      password
    }).then((res) => {
      const { msg, userId } = res.data;
      if (msg === "exist") {
        alert("Login Successful");
        console.log(userId);
        localStorage.setItem('doctor_id', userId);
        navigate('/Doctor');
      } else {
        alert("Login Failed");
      }
    }).catch((err) => {
      console.error("Login Error:", err);
      alert("An error occurred during login.");
    });
  };

  return (
    <div className="doctors-login-container">
      <form className="doctors-login-form" onSubmit={handleSubmit}>
        <h2>Doctors Login</h2>
        <div className="doctors-input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="doctors-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="doctors-login-btn">Login</button>

        {/* Footer Section */}
        <div className="doctors-footer-container mt-4">
          <p>
            Don't have an account ?  {" "}
            <Link to="/DoctorsForm" className="doctors-login-link">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default DoctorsLogin;
