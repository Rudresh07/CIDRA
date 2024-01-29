// Frontend/pages/Doc.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';
import baseURL from "./config.js";
import '../cSS/doc.css';

function Doc() {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [document, setDocument] = useState(null);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const documentData = {
        title,
        document,
      };

      await axios.post(`${baseURL}documents/upload-doc`, documentData, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token')
        },
      });

      console.log('Document uploaded successfully');
      // Add any additional logic, e.g., redirect or show a success message
    } catch (error) {
      console.error('Error uploading document:', error);
      // Handle errors, show error message, etc.
    }
  };

  return (
    <div className="doc-container">
      <div className="doc-card">
        <h2>Upload Document</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          <label>
            Document File:
            <input type="file" name="document" accept=".pdf" onChange={handleFileChange} />
          </label>
          <button type="submit">Upload Document</button>
        </form>
      </div>
    </div>
  );
}

export default Doc;
