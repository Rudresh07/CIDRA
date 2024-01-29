// Frontend/pages/Complaint.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import { useAuth } from './authcontext.js';
import '../cSS/complaint.css'; // Import your CSS file
import { ClipLoader } from 'react-spinners';

function Complaint() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch complaints when the component mounts
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${baseURL}complaint/complaints`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });


      
      setComplaints(response.data.complaints);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setLoading(false); // Set loading to false on error as well
    }
  };



  return (
    <div className="complaint-container">
      <div className="complaint-card">
        <h2>Complaints</h2>
        {loading ? (
          <ClipLoader id="load" color="#0c356a" loading={loading} size={50} /> // Loading spinner
        ) : (
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id} className="notice-item">
                <strong>Author:</strong> {complaint.author.name} <br />
                <strong>Time:</strong> {new Date(complaint.time).toLocaleString()} <br />
                <strong>Content:</strong> {complaint.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Complaint;
