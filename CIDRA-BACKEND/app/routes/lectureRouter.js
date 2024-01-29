// routes/lectureRoutes.js
const express = require('express');
const Lecture = require('../model/lectureModel');
const teacherauthMiddleware = require('../middleware/teacherauthmiddleware');

const router = express.Router();

// Admin posts a lecture
router.post('/post-lecture', teacherauthMiddleware, async (req, res) => {
  try {
    console.log('req.teacher:', req.teacher);
   
    const { content, link } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.teacher._id;
    const authorname = req.teacher.name;
    console.log(req.teacher.name)

    // Create a new lecture
    const newLecture = new Lecture({ content, link, author,authorname });

    await newLecture.save();

    res.status(201).json({ message: 'Lecture link posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all lectures
router.get('/lectures', async (req, res) => {
  try {
    // const lectures = await Lecture.find().sort({ date: 'desc' });
    const lectures = await Lecture.find().sort({ time: 'desc' }).populate('author', 'name').sort({ date: 'desc' });
    const formattedLectures = lectures.map(lecture => ({
      
      content: lecture.content,
      link: lecture.link,
      author: lecture.authorname, // Include author's name separately
      date: lecture.date,
      
    }));
    res.status(200).json({ lectures:formattedLectures  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get lectures posted by the logged-in teacher
router.get('/get-lectures', teacherauthMiddleware, async (req, res) => {
  try {
    // The teacherauthMiddleware should set the user details in the request
    const authorId = req.teacher._id;

    // Fetch lectures posted by the logged-in teacher
    const lectures = await Lecture.find({ author: authorId });

    // If no lectures are found, return a message
    if (lectures.length === 0) {
      return res.status(404).json({ message: 'No lectures found for this teacher' });
    }

    // Format and send the response
    const formattedLectures = lectures.map(lecture => ({
      content: lecture.content,
      link: lecture.link,
      // Add any other properties you want to include
    }));

    res.status(200).json({ lectures: formattedLectures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
