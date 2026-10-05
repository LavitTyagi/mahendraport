const express = require('express');
const router = express.Router();
const { Experience } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(async (req, res) => {
    const experiences = await Experience.find().sort('order');
    res.json(experiences);
  })
  .post(protect, async (req, res) => {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  })
  .delete(protect, async (req, res) => {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
