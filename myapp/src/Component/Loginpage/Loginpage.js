import React, { useState } from 'react';
import './Loginpage.css'; // Importing the CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", {
      email, password
    })
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("userid", result.data.userId);
          alert("Login successfully");
          navigate("/navbar");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>

        {/* Form Footer inside the form */}
        <div className="form-footer mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/RegistrationForm" className="login-link">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Loginpage;
