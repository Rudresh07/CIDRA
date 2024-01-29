// routes/noticeRoutes.js
const express = require('express');
const Notice = require('../model/NoticesModel');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');// Add your authentication middleware here

const router = express.Router();

router.post('/post-notice', teacherauthMiddleware, async (req, res) => {
  try {
    console.log('req.teacher:', req.teacher);
    const { content } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.teacher._id;

    // Create a new notice
    const newNotice = new Notice({ content, author });

    await newNotice.save();

    res.status(201).json({ message: 'Notice posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all notices
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: 'desc' }).populate('author', 'name');

    res.status(200).json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get lectures posted by the logged-in teacher
router.get('/get-notices', teacherauthMiddleware, async (req, res) => {
  try {
    // The teacherauthMiddleware should set the user details in the request
    const authorId = req.teacher._id;

    // Fetch lectures posted by the logged-in teacher
    const notices = await Notice.find({ author: authorId }).populate('author', 'name');

    // If no lectures are found, return a message
    if (notices.length === 0) {
      return res.status(404).json({ message: 'No notices found for this teacher' });
    }

    // Format and send the response
    const formattednotices = notices.map(notice  => ({
      content: notice.content,
      date: notice.date,
      author:notice.author
    }));

    res.status(200).json({ notices: formattednotices  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
