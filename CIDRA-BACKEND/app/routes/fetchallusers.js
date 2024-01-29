// routes/userRoutes.js
const express = require('express');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');
const User = require('../model/userModel');
const teacher = require('../model/teacherModel');

const router = express.Router();

// Get all users
router.get('/all-users', teacherauthMiddleware, async (req, res) => {
  try {
    // Fetch all users from the database
    const allUsers = await User.find();

    // Exclude sensitive information like passwords before sending the response
    const sanitizedUsers = allUsers.map(user => ({
      name: user.name,
      rollNo: user.rollNo,
      dob: user.dob,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
      profilePhotoUrl:user.profilePhotoUrl
    }));

    res.status(200).json({ users: sanitizedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all users
router.get('/all-teacher', teacherauthMiddleware, async (req, res) => {
    try {
      // Fetch all users from the database
      const allteacher = await teacher.find();
  
      // Exclude sensitive information like passwords before sending the response
      const sanitizedteachers = allteacher.map(teacher => ({
        name: teacher.name,
        id:teacher.id,
        rollNo: teacher.rollNo,
        dob: teacher.dob,
        email: teacher.email,
        mobileNumber: teacher.mobileNumber,
        address: teacher.address,
        profilePhotoUrl: teacher.profilePhotoUrl,
      }));
  
      res.status(200).json({ teacherers: sanitizedteachers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
