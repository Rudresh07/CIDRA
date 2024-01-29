// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true }, // User is the model used here
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
