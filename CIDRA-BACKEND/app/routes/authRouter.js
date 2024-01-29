const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const teacher = require('../model/teacherModel');
const authMiddleware = require('../middleware/authmiddleware');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');

const router = express.Router();

// Signup route is POST: http://localhost:3000/auth/signup

router.post('/signup', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name , password,rollNo,dob,email,mobileNumber,address,profilePhotoUrl} = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ rollNo });
if (existingUser) {
  return res.status(400).json({ error: 'Username already exists', existingUser });
}


    // Create a new user
    const newUser = new User({ name , password,rollNo,dob,email,mobileNumber,address,profilePhotoUrl});

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
  
});
//Login route is POST: http://localhost:3000/auth/login
router.post('/login', async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ rollNo });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '3d' }); // Replace 'your-secret-key' with your actual secret key

    // Set the token as a cookie (optional)
    res.cookie('token', token, { httpOnly: true, maxAge: 259200000 }); // Max age is set to 1 hour in milliseconds

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//for teacher
// Signup route is POST: http://localhost:3000/auth/signup

router.post('/signupteacher', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { name , password,id,dob,email,mobileNumber,department,profilePhotoUrl} = req.body;

    // Check if the username is already taken
    const existingteacher = await teacher.findOne({ id });
if (existingteacher) {
  return res.status(400).json({ error: 'teacher already exists', existingteacher });
}


    // Create a new user
    const newteacher = new teacher({ name , password,id,dob,email,mobileNumber,department,profilePhotoUrl});

    await newteacher.save();

    res.status(201).json({ message: 'teacher registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
  
});
//Login route is POST: http://localhost:3000/auth/login
router.post('/loginteacher', async (req, res) => {
  try {
    const { id, password } = req.body;

    // Check if the user exists
    const foundTeacher = await teacher.findOne({ id });
    console.log(teacher);
    if (!foundTeacher) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    if (password !== foundTeacher.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    // Generate a JWT token
    const token = jwt.sign({ teacherId: foundTeacher._id }, 'your-secret-key', { expiresIn: '3d' }); // Replace 'your-secret-key' with your actual secret key

    // Set the token as a cookie (optional)
    res.cookie('token', token, { httpOnly: true, maxAge: 259200000 }); // Max age is set to 1 hour in milliseconds

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Example protected route using authMiddleware
router.get('/protected-route', authMiddleware, (req, res) => {
  // This route is protected, only accessible with a valid token
  res.status(200).json({ message: 'Protected route accessed successfully' });
});
router.get('/protected-routes', teacherauthMiddleware, (req, res) => {
  // This route is protected, only accessible with a valid token
  res.status(200).json({ message: 'Protected route accessed successfully' });
});


module.exports = router;
