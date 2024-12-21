import React, { useState } from 'react';
import './Admin.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
function Admin() {
  const [data, setdata] = useState({
    username: "",
    password: ""
  })
  const Navigate = useNavigate();
  const changefun = ((e) => {
    setdata({
      ...data, [e.target.name]: e.target.value
    })
  })
  console.log(data)

  // const changefun = (e) => {
  //   e.preventDefault();

  const { username, password } = data;
  const handleSubmit = (() => {
    if (username === 'admin' && password === 'admin123') {
      alert('Login Successful!');
      localStorage.setItem("admin", "hospitaladmin")
      Navigate('/AdminDashboard');

    } else {
      alert('Invalid username or password');
    }

  })
  return (

    <div className="admin-login-container">
      <div className="loginn-form">
        <h2>Admin</h2>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="form-groupp">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={changefun}


            />
          </div>

          {/* Password input */}
          <div className="form-groupp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={changefun}

            />
          </div>

          {/* Login button */}
          <button type="submit" className="login-btn">Log In</button>
          <Link to="/"><button type='submit' className="logout-btn">Log Out</button></Link>
        </form>
      </div>
    </div>


  );
}

export default Admin;
