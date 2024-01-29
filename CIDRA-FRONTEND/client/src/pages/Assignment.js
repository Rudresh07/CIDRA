import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cSS/assignment.css";
import baseURL from "./config.js";
import { useAuth } from "./authcontext";

function Assignment() {
  // const { token } = useAuth();
  const [content, setCont] = useState("");
  const [duedate, setDuedate] = useState("");
  const [glink, setGlink] = useState("");
  const [pdf, setPdf] = useState(null);
  const [assignments, setAssignments] = useState([]);
  
  const handleCont = (e) => setCont(e.target.value);
  const handleDate = (e) => setDuedate(e.target.value);
  const handleGlink = (e) => setGlink(e.target.value);
  const handlePdf = (e) => setPdf(e.target.files[0]);

  // const formattedDate = new Date(dueDate);

// Get the date in the format YYYY-MM-DD
  // const datePart = formattedDate.toISOString().split('T')[0];

  useEffect(() => {
    // Fetch all assignment when the component mounts
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`${baseURL}assignment/assignments`, {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        });
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the lecture data to the backend
      const assignmentData = {
        content,
        dueDate: duedate,
        googleFormLink: glink,
        pdf,
      };
      await axios.post(
        `${baseURL}lectures/post-lecture`,
        assignmentData,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          },
        }
      );

      setCont('');
      setGlink('');
      setDuedate('');
      setPdf('');
      // Fetch lectures again to update the list
      
          const response=await axios.get(`${baseURL}assignment/assignments`, assignmentData, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            setAssignments(response.data.assignments);
            console.log("Assignment posted successfully");
      
      // Add any additional logic, e.g., redirect or show a success message
    } catch (error) {
      console.error('Error posting assignment:', error);
      // Handle errors, show error message, etc.
    }
  };


  return (
    <div className="assignment-container">
      <div className="assignment-card">
        <h2>Post Assignment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <input
              type="text"
              name="content"
              value={content}
              onChange={handleCont}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={duedate}
              onChange={handleDate}
            />
          </label>
          <label>
            Google Form Link:
            <input
              type="text"
              name="googleFormLink"
              value={glink}
              onChange={handleGlink}
            />
          </label>
          <label>
            PDF File:
            <input type="file" name="pdf" accept=".pdf" onChange={handlePdf} />
          </label>
          <button type="submit">Post Assignment</button>
        </form>
      </div>
      <div className="posted-assignments">
        <h2>Posted Assignments</h2>
        <ul>
          {assignments.map((assignment, index) => (
            <li key={assignment._id}>
              <p>Content: {assignment.content}</p>
              <p>Due Date: {assignment.dueDate}</p>
              <p>
                Google Form Link:{" "}
                <a
                  href={assignment.googleFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {assignment.googleFormLink}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignment;