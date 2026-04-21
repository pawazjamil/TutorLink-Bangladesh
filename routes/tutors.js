const express = require('express');
const Tutor = require('../models/Tutor');
const router = express.Router();

// GET all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find({ status: 'active' });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single tutor
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new tutor
router.post('/', async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    const newTutor = await tutor.save();
    res.status(201).json(newTutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update tutor
router.put('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE tutor
router.delete('/:id', async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tutor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST rating
router.post('/:id/rate', async (req, res) => {
  try {
    const { rating, comment, userName } = req.body;
    const tutor = await Tutor.findById(req.params.id);
    
    tutor.reviews.push({ user: userName, rating, comment, date: new Date().toLocaleDateString() });
    
    const total = tutor.rating * tutor.totalRatings + rating;
    tutor.totalRatings++;
    tutor.rating = total / tutor.totalRatings;
    
    await tutor.save();
    res.json(tutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;