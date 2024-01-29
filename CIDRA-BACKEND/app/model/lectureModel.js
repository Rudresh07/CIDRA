// models/Lecture.js
const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  content: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
  authorname: { type:String },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
