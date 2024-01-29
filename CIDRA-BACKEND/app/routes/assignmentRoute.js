// routes/assignmentRoutes.js
const express = require('express');
const Assignment = require('../model/assignmentModel');
const authMiddleware = require('../middleware/authmiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Admin posts an assignment
router.post('/post-assignment', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    const { content, dueDate, googleFormLink } = req.body;


        // Check if req.file exists and use req.file.buffer
        const pdfContent = req.file ? req.file.buffer : null;
    // The authMiddleware should set the user details in the request
    const author = req.user.name; // Assuming your user model has a 'name' field

    // Create a new assignment
    const newAssignment = new Assignment({
      author,
      content,
      dueDate,
      googleFormLink,
      pdf: pdfContent, // Multer adds 'buffer' to the request file
    });

    await newAssignment.save();

    res.status(201).json({ message: 'Assignment posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ date: 'desc' });

    res.status(200).json({ assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
