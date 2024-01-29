// models/complaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorname: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  time: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
