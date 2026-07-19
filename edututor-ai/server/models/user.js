// Future-proof MongoDB schema (optional)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'student' },
  enrolledCourses: [String],
});

module.exports = mongoose.model('User', userSchema);
