// Frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Assignment from './pages/Assignment';
import Lecture from './pages/Lecture';
import Notice from './pages/Notice';
import Doc from './pages/Doc';
import Complaint from './pages/Complaint';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Addstd from './pages/Addstd';
import Addteach from './pages/Addteach';

function App() {
  return (
      // <div style={{backgroundColor:"#000", height:"20vh", width:"20vw"}}></div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assignments" element={<Assignment />} />
          <Route path="/lectures" element={<Lecture />} />
          <Route path="/notices" element={<Notice />} /> 
          <Route path="/documents" element={<Doc />} /> 
          <Route path="/complaints" element={<Complaint />} /> 
          <Route path="/profiles" element={<Profile />} /> 
          <Route path="/users" element={<Users />} /> 
          <Route path="/addstudent" element={<Addstd />} /> 
          <Route path="/addteacher" element={<Addteach />} /> 


          
        </Routes>
      </div>
  );
}

export default App;
