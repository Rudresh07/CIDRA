// middleware/teacherauthMiddleware.js
const jwt = require('jsonwebtoken');
const teacherModel = require('../model/teacherModel');

const teacherauthMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

    console.log('Decoded Token:', decoded);

    // Find the teacher based on the decoded information
    const foundTeacher = await teacherModel.findById(decoded.teacherId);

    if (!foundTeacher) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Set the teacher details in the request object for later use
    req.teacher = foundTeacher;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = teacherauthMiddleware;
