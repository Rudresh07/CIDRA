
const express = require('express');
const Pdf = require('../model/uploadDocModel');
const authMiddleware = require('../middleware/authmiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// User uploads a document
router.post('/upload-doc', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    // Check if req.file exists and use req.file.buffer
    const pdfContent = req.file ? req.file.buffer : null;
    const { title } = req.body;

    // The authMiddleware should set the user details in the request
    const author = req.user._id;

    // Create a new document record
    const newDocument = new Pdf({ title, author, document: pdfContent });

    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all uploaded documents
router.get('/documents', async (req, res) => {
  try {
    const documents = await Pdf.find().sort({ date: 'desc' });

    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
