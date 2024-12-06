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
    // console.log("userid is: " , userId)
    axios.get("http://localhost:4000/doclist")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor list:", error);
        setMessage("Failed to load doctors. Please try again.");
      });
  }, []);

  const bookHandler = () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      setMessage("Please fill all the fields to book an appointment.");
      return;
    }

    console.log("Selected Doctor ID:", selectedDoctor); // Logs the selected doctor's ID
    setIsSubmitting(true);

    const appointmentData = {
      userId,
      doctorId: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      status:"pending"
    };

    axios.post("http://localhost:4000/bookapp", appointmentData)
      .then((res) => {
        console.log(res.data)
        if (res.status == 201) {
          setMessage("Appointment booked successfully!");
          setSelectedDoctor('');
          setAppointmentDate('');
          setAppointmentTime('');
        }
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        setMessage("Failed to book appointment. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bookapp">
      <div className="book-appointment">
        <h2>Book an Appointment</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Select Doctor:
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)} // Update the selectedDoctor state
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

          <button
            type="button"
            disabled={isSubmitting}
            onClick={bookHandler}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default BookAppointment;
