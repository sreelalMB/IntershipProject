import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Patients.css";

const PatientProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const id = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.post(`/api/patient/view/${id}`);
        setPatient(response.data.patient);
        setAppointments(response.data.appointments || []);
        setData(response.data.patient);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!String(data.phone).match(/^[0-9]{10}$/)) {
      isValid = false;
      tempErrors["phone"] = "Phone number must be exactly 10 digits.";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const response = await axios.post(`/api/patient/edit/${id}`, data);
        console.log("Profile updated successfully", response);
        setPatient(data);
        setEditMode(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/Navbar");
  };

  return (
    <div className="patient-profile">
      <div className="profile-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2>Patient Profile</h2>
      </div>

      <div className="profile-details">
        <div className="profile-image">
          <img
            src={patient.imageUrl || "default-profile.png"}
            alt="Profile"
            width="200px"
            height="200px"
          />
        </div>

        {editMode ? (
          <>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className="form-control"
              >
                <option hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                className="form-control"
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>
            
            <div className="edit-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="appointments-section">
        <h3>Appointment History</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p><strong>Reason:</strong> {appointment.reason}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
