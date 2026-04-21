const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  phone: String,
  location: String,
  profilePic: String,
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);