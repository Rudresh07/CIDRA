import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Users from "./Users.js"

function Addteach() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const teacherData = {
          name,
          password,
          id,
          dob,
          email,
          mobileNumber,
          department,
          profilePhoto: previewImage
        };
  
        await axios.post(`${baseURL}auth/signupteacher`, teacherData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        });
        console.log('Teacher added successfully');
  
        // Redirect to the previous page or a different page after successful form submission
        return navigate(-1);
      } catch (error) {
        console.error('Error adding teacher:', error);
        // Handle error cases here
      }
    };
  
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setProfilePhoto(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    return (
      <div>
       
       <h2 style={{ textAlign: 'center', color: '#0c356a' }}>Add Teacher</h2>

        <form onSubmit={handleSubmit}>
          {/* Input fields for teacher details */}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number" />
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
  
          {/* Input field for profile photo */}
          <div>
            <label htmlFor="profilePhoto">Profile Photo (JPG or PNG):</label>
            <input
              type="file"
              id="profilePhoto"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
          </div>
          
          {/* Display preview of selected image */}
          {previewImage && (
            <div>
              <h4>Selected Image Preview:</h4>
              <img src={previewImage} alt="Preview" style={{ width: '200px' }} />
            </div>
          )}
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Addteach;
  