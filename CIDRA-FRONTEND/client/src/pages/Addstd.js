import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Users from "./Users.js"

function Addstd() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // State to store the selected image file
  const [previewImage, setPreviewImage] = useState(null); // State to store the preview of the selected image

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        name,
        password,
        rollNo,
        dob,
        email,
        mobileNumber,
        address,
        profilePhoto: previewImage // Pass the image data as a URL or Base64 string
      };

      await axios.post(`${baseURL}auth/signup`, studentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      });
      console.log('Student added successfully');

      // Redirect to the previous page after successful form submission
      return navigate(-1);
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error cases here
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Update state with selected image file
      setProfilePhoto(selectedFile);

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile); // Convert image to Base64 string
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#0c356a' }}>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" />
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

        <div>
          <label htmlFor="profilePhoto">Profile Photo (JPG or PNG):</label>
          <input
            type="file"
            id="profilePhoto"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </div>
        
        {/* Preview of selected image */}
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

export default Addstd;
