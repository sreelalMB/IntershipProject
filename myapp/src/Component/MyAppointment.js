import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyAppointment() {
    const [appointments, setAppointments] = useState({});
    const [rejectedappointments, setRejectedAppointments] = useState([]);

    const id = localStorage.getItem("userid");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.post(`http://localhost:4000/userAppointmentView/${id}?status=approved`);
                if (res.status === 201) {
                    console.log(res.data)
                    setAppointments(res.data);
                    console.log("API Response:", res.data);
                } else {
                    console.log("No appointments found.");
                    setAppointments([]);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [id]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.post(`http://localhost:4000/userAppointmentView/${id}?status=rejected`);
                if (res.status === 201) {
                    console.log(res.data)
                    setRejectedAppointments(res.data);
                    console.log("API Response:", res.data);
                } else {
                    console.log("No appointments found.");
                    setRejectedAppointments([]);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [id]);

    return (
        <div className="appointments-section bg-blue-300 h-full p-6 rounded-lg shadow-lg">
            <h3 className="text-5xl font-black text-white mb-4 text-center">My Appointments</h3>
            <div className="w-[60rem] ml-72">
                {appointments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-12">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment._id}
                                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                            >
                                <p className="text-gray-700">
                                    <span className="font-black">Date:</span>{" "}
                                    {new Date(appointment.date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Time:</span> {appointment.time}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Doctor:</span> {appointment.doctor.name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Specialization:</span>{" "}
                                    {appointment.doctor.specialization}
                                </p>
                                <p className="bg-green-500 rounded text-white font-bold p-1 text-center ">Approved</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No appointments found.</p>
                )}
            </div>
            <div className="w-[60rem] ml-72">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-12">
                        {rejectedappointments.map((appointment) => (
                            <div
                                key={appointment._id}
                                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                            >
                                <p className="text-gray-700">
                                    <span className="font-black">Date:</span>{" "}
                                    {new Date(appointment.date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Time:</span> {appointment.time}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Doctor:</span> {appointment.doctor.name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-black">Specialization:</span>{" "}
                                    {appointment.doctor.specialization}
                                </p>
                                <p className="bg-red-500 rounded text-white font-bold p-1 text-center ">Rejected</p>
                            </div>
                        ))}
                    </div>

            </div>
        </div>

    )
}

export default MyAppointment