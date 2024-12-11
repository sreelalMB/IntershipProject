import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Patients.css";

const PatientProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState({});
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
        const res = await axios.post(`http://localhost:4000/patientview/${id}`);
        if (res.status === 200) {
          console.log("Data Fetched Successfully");
          setPatient(res.data);
          setData(res.data); // Initialize data for editing
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [id]);

  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     try {
  //       const res = await axios.post(`http://localhost:4000/userAppointmentView/${id}?status=approved`);
  //       if (res.status === 201) {
  //         console.log(res.data)
  //         setAppointments(res.data);
  //         console.log("API Response:", res.data);
  //       } else {
  //         console.log("No appointments found.");
  //         setAppointments([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching appointments:", error);
  //     }
  //   };

  //   fetchAppointments();
  // }, [id]);

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
        const response = await axios.put(`http://localhost:4000/profileupdate/${id}`, data);
        console.log("Profile updated successfully", response);
        setPatient(data); // Update patient data after successful save
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
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2>Patient Profile</h2>
      </div>

      <div className="profile-details">
        <div className="profile-image">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>

            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* <div className="appointments-section bg-gray-50 p-6 rounded-lg shadow-lg">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Appointment History</h3>
  {appointments.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <p className="text-gray-700">
            <span className="font-medium">Date:</span>{" "}
            {new Date(appointment.date).toLocaleDateString()} || {appointment.time}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Doctor:</span> {appointment.doctor.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Specialization:</span>{" "}
            {appointment.doctor.specialization}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No appointments found.</p>
  )}
</div> */}

    </div>
  );
};

export default PatientProfile;
