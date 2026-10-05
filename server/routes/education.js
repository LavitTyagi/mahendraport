const express = require('express');
const router = express.Router();
const { Education } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(async (req, res) => {
    const education = await Education.find();
    res.json(education);
  })
  .post(protect, async (req, res) => {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(edu);
  })
  .delete(protect, async (req, res) => {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
