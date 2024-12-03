import React, { useState, useEffect } from 'react';
import './Bookappointment.css';
import axios from 'axios';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    axios.get("http://localhost:4000/doclist")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor list:", error);
        setMessage("Failed to load doctors. Please try again.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert("Please fill in all fields");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(appointmentDate);
    if (selectedDate < currentDate) {
      alert("Please select a valid future date");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`http://localhost:4000/bookapp/${userId}`, {
        selectedDoctor,
        appointmentDate,
        appointmentTime,
      });

      if (res.status === 201) {
        const { message, Doctor } = res.data;
        localStorage.setItem("DoctorId", Doctor);
        setMessage(message || "Appointment Booked Successfully");
        alert("Appointment Booked Successfully");
      } else {
        setMessage("Booking Failed");
        alert("Booking Failed");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("An error occurred while booking the appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bookapp">
      <div className="book-appointment">
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Select Doctor:
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">--Select Doctor--</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </label>

          <label>
            Appointment Date:
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </label>

          <label>
            Appointment Time:
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default BookAppointment;
