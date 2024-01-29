
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, unique: true, required: true }, // Ensure 'unique: true' for rollNo
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
  department: { type: String, required: true },
  profilePhotoUrl:{type:String}
});

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;
