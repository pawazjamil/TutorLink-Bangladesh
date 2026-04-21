const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  subject: { type: String, required: true },
  baseRate: { type: Number, required: true },
  perDayRate: { type: Number, required: true },
  location: { type: String, required: true },
  qualification: String,
  experience: Number,
  bio: String,
  avatar: String,
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  reviews: { type: Array, default: [] },
  profilePic: String,
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);