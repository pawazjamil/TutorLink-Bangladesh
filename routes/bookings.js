const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// GET all bookings for a user
router.get('/user/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ studentEmail: req.params.email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;