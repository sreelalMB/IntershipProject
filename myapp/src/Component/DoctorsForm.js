import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DoctorsForm.css"; // Updated to the new CSS file
import axios from "axios";

const DoctorsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/doctorreg", {
      name, email, specialization, password, phone
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Doctor registered successfully");
        } else {
          alert("Something went wrong");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="doctors-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="doctors-input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="doctors-input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="doctors-input-group">
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>

        <div className="doctors-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="doctors-input-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="doctors-submit-button">
          Register
        </button>

        <Link to="/DoctorsLogin">
          <button type="button" className="doctors-logout-button">
            Back
          </button>
        </Link>

        
        
      </form>
    </div>
  );
};

export default DoctorsForm;
