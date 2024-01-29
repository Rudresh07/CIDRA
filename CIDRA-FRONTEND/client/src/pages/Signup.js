// Frontend/pages/Signup.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from "../images/iiit.png"
import "../cSS/signup.css"; // Import your CSS file

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    rollNo: '',
    dob: '',
    email: '',
    mobileNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        // Redirect or show success message as needed
      } else {
        console.error(data.error);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="lhs">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input placeholder='Enter Name' type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            {/* Add other input fields similar to the above */}
            <button type="submit">Signup</button>
          </form>
        </div>
        <div className="rhs">
        <div className="img">
            <img src= {Logo} alt="Logo" />
          </div>
          {/* <span>Don't you have an account?</span> */}
          <div className="rhsbut">
          <Link to="/Login">
            <button>Login</button>
          </Link>
          </div>
          {/* Add content for the right side if needed */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
