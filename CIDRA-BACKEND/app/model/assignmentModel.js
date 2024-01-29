// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  dueDate: { type: Date, required: true },
  googleFormLink: { type: String, required: true },
  pdf: { type: Buffer, required: false }, // Buffer to store PDF data
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
