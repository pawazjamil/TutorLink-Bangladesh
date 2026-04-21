const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tutor: { type: String, required: true },
  tutorEmail: { type: String, required: true },
  subject: { type: String, required: true },
  days: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  status: { type: String, default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);