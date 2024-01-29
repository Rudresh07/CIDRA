// Frontend/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from "./config.js";
import { useAuth } from './authcontext.js';
import '../cSS/profile.css'; // Import your CSS file
import { ClipLoader } from 'react-spinners';
// import '../images/cbum.webp'
import CBUM from "../images/cbum.jpeg";

function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchOption, setSearchOption] = useState('name'); // Default search option
  const [userNotFound, setUserNotFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetch user profile when the component mounts
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile...');
      const response = await axios.get(`${baseURL}profile/profileteacher`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      setProfile(response.data.teacher);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Fetch user profile based on search criteria and search option
      const response = await axios.get(`${baseURL}search-users`, {
        params: { [searchOption]: searchCriteria },
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });

      // Update the state based on search results
      const searchResult = response.data.searchResult;

      if (searchResult.length === 0) {
        setUserNotFound(true);
      } else {
        setUserNotFound(false);
        setSearchResult(searchResult);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error searching user:', error);
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {loading ? (
          <>
            <div className='anim'>
              <h2>Loading Profile...</h2>
              <ClipLoader id="load" color="#0c356a" loading={loading} size={50} /> 
            </div>
          </>
        ) : (
          <>
            {userNotFound ? (
              <h2>User not found</h2>
            ) : (
              <>
                <div className="profile-details">
                  <h2>Profile</h2>
                  <div className='dets'>
                    <div className='proimg'>
                      <img id = 'bumimg' src={CBUM} alt="CBUM" />
                    </div>
                    <div className='tbl'> 
                      <table>
                        <tbody>
                          <tr>
                            <td><strong>Name</strong></td>
                            <td>{profile.name}</td>
                          </tr>
                          <tr>
                            <td><strong>Roll Number</strong></td>
                            <td>{profile.id}</td>
                          </tr>
                          <tr>
                            <td><strong>Date of Birth</strong></td>
                            <td>{profile.dob}</td>
                          </tr>
                          <tr>
                            <td><strong>Email</strong></td>
                            <td>{profile.email}</td>
                          </tr>
                          <tr>
                            <td><strong>Mobile Number</strong></td>
                            <td>{profile.mobileNumber}</td>
                          </tr>
                          <tr>
                            <td><strong>Department</strong></td>
                            <td>{profile.department}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="search-bar">
                  <select
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="rollNo">Roll Number</option>
                    <option value="email">Email</option>
                    {/* Add other search options as needed */}
                  </select>
                  <input
                    type="text"
                    placeholder={`Search by ${searchOption}`}
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                  />
                </div>
                  <button onClick={handleSearch}>Search</button>

                {searchResult.length > 0 && (
                  <div className="search-results">
                    <h2>Search Results</h2>
                    {/* Display search results here */}
                    {searchResult.map((result) => (
                      <div key={result.rollNo}>
                        {/* Display individual search result */}
                        <p>
                          <strong>Name:</strong> {result.name}
                        </p>
                        <p>
                          <strong>Roll Number:</strong> {result.rollNo}
                        </p>
                        <p>
                          <strong>Email:</strong> {result.email}
                        </p>
                        {/* Add other details as needed */}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
