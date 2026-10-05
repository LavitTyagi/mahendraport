const express = require('express');
const router = express.Router();
const { Message } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, async (req, res) => {
    const messages = await Message.find().sort('-createdAt');
    res.json(messages);
  })
  .post(async (req, res) => {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(message);
  })
  .delete(protect, async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
