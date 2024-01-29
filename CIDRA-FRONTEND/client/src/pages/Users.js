import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import '../cSS/user.css'; // Import your CSS file
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Users() {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users and teachers when the component mounts
    fetchAllUsersAndTeachers();
  }, []);

  const fetchAllUsersAndTeachers = async () => {
    try {
      setLoading(true);

      // Fetch all users
      const responseUsers = await axios.get(`${baseURL}all-users`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      setUsers(responseUsers.data.users);

      // Fetch all teachers
      const responseTeachers = await axios.get(`${baseURL}all-teacher`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      setTeachers(responseTeachers.data.teacherers);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching users and teachers:', error);
      setLoading(false);
    }
  };

  return (
    <div className="users-container">
      <div className="users-card">
        {loading ? (
          <>
            <div className='anim'>
              <h2>Loading Users and Teachers...</h2>
              <ClipLoader id="load" color="#0c356a" loading={loading} size={50} /> 
            </div>
          </>
        ) : (
          <>
            <div className="users-list">
              <h2>All Users ({users.length})</h2>
              <Link to="/addstudent">
                <button id = "btstd">Add Student</button>
              </Link>
              <div className="scroll-container">
                {users.map((user) => (
                  <div key={user.rollNo} className="user-item">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Roll Number:</strong> {user.rollNo}
                    </p>
                    {/* Add other details as needed */}
                  </div>
                ))}
              </div>
            </div>

            <div className="teachers-list">
              <h2>All Teachers ({teachers.length})</h2>
              <Link to="/addteacher">
                <button id = "btteach">Add Teacher</button>
              </Link>
              <div className="scroll-container">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="teacher-item">
                    <p>
                      <strong>Name:</strong> {teacher.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {teacher.email}
                    </p>
                    <p>
                      <strong>ID:</strong> {teacher.id}
                    </p>
                    {/* Add other details as needed */}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
