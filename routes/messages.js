const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// GET messages between two users
router.get('/:user1/:user2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.params.user1, to: req.params.user2 },
        { from: req.params.user2, to: req.params.user1 }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new message
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// MARK messages as read
router.put('/read/:from/:to', async (req, res) => {
  try {
    await Message.updateMany(
      { from: req.params.from, to: req.params.to, read: false },
      { read: true }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;