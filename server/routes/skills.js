const express = require('express');
const router = express.Router();
const { Skill } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(async (req, res) => {
    const skills = await Skill.find().sort('order');
    res.json(skills);
  })
  .post(protect, async (req, res) => {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  })
  .delete(protect, async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
