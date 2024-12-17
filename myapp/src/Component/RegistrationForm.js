import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegistrationForm.css";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    axios.post("http://localhost:4000/userreg", formData)
      .then((result) => {
        if (result.status === 200) {  // Access 'status' directly from the result
          alert("User saved successfully");
        } else {
          alert("Something went wrong");
        }
        console.log(result); // Log the full response to inspect
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-groupp">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groupp">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groupp">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groupp">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <Link to="/Loginpage"><button type="submit" className="signout-btn">
          Back
        </button></Link>

        <div className="form-footer">
         
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
