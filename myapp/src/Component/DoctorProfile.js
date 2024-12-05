import React, { useState, useEffect } from 'react';
import './DoctorProfile.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DoctorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(location.state || { name: '', email: '', specialization: '', image: '', id: '' });
  const [previewImage, setPreviewImage] = useState(profile.image || '');
  const userId = localStorage.getItem("doctor_id");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4000/userprofile/${userId}`)
        .then((res) => setProfile(res.data.user))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('specialization', profile.specialization);
    if (profile.image) formData.append('profileImage', profile.image);

    try {
      const response = await axios.put(`http://localhost:4000/update/${profile.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert("Profile updated successfully");
      } else {
        alert('Profile update failed: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Profile update failed');
    }
  };

  return (
    <div className="doctor-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Profile Image:</label>
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* {previewImage && <img src={previewImage} alt="Preview" />} */}
          </div>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Specialization:</label>
          <input
            type="text"
            value={profile.specialization}
            onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default DoctorProfile;
