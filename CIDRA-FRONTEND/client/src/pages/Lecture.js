// Frontend/pages/Lecture.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import '../cSS/lecture.css';

function Lecture() {
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [lectures, setLectures] = useState([]);

  const handleCont = (e) => {setContent(e.target.value);}
  const handleLink = (e) => {setLink(e.target.value);}

  useEffect(() => {
    // Fetch all lectures when the component mounts
    const fetchLectures = async () => {
      try {
        const response = await axios.get(`${baseURL}lectures/get-lectures`, {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        });
        setLectures(response.data.lectures);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchLectures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the lecture data to the backend
      await axios.post(
        `${baseURL}lectures/post-lecture`,
        { content, link },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        }
      );

      setContent('');
      setLink('');
      // Fetch lectures again to update the list
      const response = await axios.get(`${baseURL}lectures/lectures`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      setLectures(response.data.lectures);

      console.log('Lecture posted successfully');
      
      // Add any additional logic, e.g., redirect or show a success message
    } catch (error) {
      console.error('Error posting lecture:', error);
      // Handle errors, show error message, etc.
    }
  };

  return (
    <div className="lecture-container">
      <div className="lecture-card">
        <h2>Post Lecture Link</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <input type="text" name="content" value={content} onChange={handleCont} />
          </label>
          <label>
            Lecture Link:
            <input type="text" name="link" value={link} onChange={handleLink} />
          </label>
          <button type="submit">Post Lecture</button>
        </form>

        <div className="lecture-list">
          <h2>Lecture List</h2>
          {lectures.map((lecture) => (
            <div key={lecture._id} className="lecture-item">
              <p>
                <strong>Content:</strong> {lecture.content}
              </p>
              <p>
                <strong>Link:</strong> <a href={lecture.link} target="_blank" rel="noopener noreferrer">{lecture.link}</a>
              </p>
              {/* Add any other details you want to display */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lecture;
