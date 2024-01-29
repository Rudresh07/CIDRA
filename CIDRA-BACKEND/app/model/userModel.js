// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  rollNo: { type: String, unique: true, required: true }, // Ensure 'unique: true' for rollNo
  dob: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  profilePhotoUrl:{ type: String },
});




const User = mongoose.model('User', userSchema);

module.exports = User;
