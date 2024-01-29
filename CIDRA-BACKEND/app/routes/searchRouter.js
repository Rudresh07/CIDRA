// routes/userRoutes.js
const express = require('express');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');
const User = require('../model/userModel');

const router = express.Router();

// Search users
router.get('/search-users', teacherauthMiddleware, async (req, res) => {
  try {
    const { name, rollNo,email,dob } = req.query;

    // Define an empty filter object
    const filter = {};

    // Add conditions to the filter based on the provided parameters
    if (name) {
      filter.name = { $regex: new RegExp(`^${name}$`, 'i') };
    }
    if (email) {
      filter.email = { $regex: new RegExp(`^${email}$`, 'i') };
    }
    if (dob) {
      filter.dob = { $regex: new RegExp(`^${dob}$`, 'i') };
    }

    if (rollNo) {
      filter.rollNo = { $regex: new RegExp(`^${rollNo}$`, 'i') };
    }

    // Use the filter object to perform the search
    const searchResult = await User.find(filter);

    // Exclude sensitive information like passwords before sending the response
    const sanitizedResult = searchResult.map(user => ({
      name: user.name,
      rollNo: user.rollNo,
      dob: user.dob,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
    }));

    res.status(200).json({ searchResult: sanitizedResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
