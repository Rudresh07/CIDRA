// Frontend/pages/Notice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from './config.js';
import '../cSS/notice.css';
import { useAuth } from './authcontext';

function Notice() {
  const { token } = useAuth();
  const [content, setCont] = useState('');
  const [notices, setNotices] = useState([]);

  function handleCont(e) {
    setCont(e.target.value);
  }

  useEffect(() => {
    // Fetch all notices when the component mounts
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${baseURL}notices/notices`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setNotices(response.data.notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${baseURL}notices/post-notice`,
        { content },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      // Fetch notices again to update the list
      const response = await axios.get(`${baseURL}notices/notices`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setNotices(response.data.notices);

      console.log('Notice posted successfully');
    } catch (error) {
      console.error('Error posting notice:', error);
    }
  };

  return (
    <div className="notice-container">
      <div className="notice-card">
        <h2>Post Notice</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <textarea name="content" value={content} onChange={handleCont} rows="4" cols="50" />
          </label>
          <button type="submit">Post Notice</button>
        </form>
      </div>

      <div className="notice-list">
        <h2>Notices</h2>
        {notices.map((notice) => (
          <div key={notice._id} className="notice-item">
            {/* <p>
              <strong>Author:</strong> {notice.author.name}
            </p> */}
            <p>
              <strong>Content:</strong> {notice.content}
            </p>
            <p>
              <strong>Date:</strong> {new Date(notice.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notice;
