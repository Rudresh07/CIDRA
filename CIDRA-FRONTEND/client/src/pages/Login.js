// Frontend/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home"
import Logo from "../images/iiit.png";
import "../cSS/login.css"; // Import your CSS file
import { useAuth } from './authcontext';

function Login() {
  const history = useNavigate();
  const { login } = useAuth();
  const [id, setRolllno]=useState('');
  const [password, setPassword]=useState('');

  function handlePassword(e){
    setPassword(e.target.value);
  }

  function handleRollno(e){
    setRolllno(e.target.value);
    console.log(id)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // console.log('Form Data:', formData);
      
      const response = await fetch("https://cidra-backend.onrender.com/auth/loginteacher", {
        // const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id, password}),
      });
  
      console.log('Response:', response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      console.log('Data:', data);
  
      if (response.ok) {
        console.log(data.message);
        localStorage.setItem("token", data.token);
        history("/home");
      } else {
        console.error(data.error);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="lhs">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                placeholder="Enter Roll no"
                type="text"
                name="id"
                value={id}
                onChange={handleRollno}
              />
            </label>
            <label>
              <input
                placeholder="Enter password"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="rhs">
          <div className="rhscont">
            <div className="img">
              <img src={Logo} alt="Logo" />
            </div>
            <Link to="/Signup">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
