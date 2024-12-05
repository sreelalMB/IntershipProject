// src/components/Login.js
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
        if (result.status == 200) {
          localStorage.setItem("userid" , result.data.userId)
          alert("Login successfully");
          navigate("/navbar")
        }
        else {
          alert("something went wrong")
        }
      })
      .catch((err) => {
        alert("something went wrong")
      })


    // You can add your login logic here (API call, etc.)
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
        <Link to="/RegistrationForm"><button type="button" className="logout-btn">Back</button></Link>
      </form>
    </div>
  );
};

export default Loginpage;
