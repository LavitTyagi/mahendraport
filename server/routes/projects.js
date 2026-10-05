const express = require('express');
const router = express.Router();
const { Project } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(async (req, res) => {
    const projects = await Project.find().sort('order');
    res.json(projects);
  })
  .post(protect, async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  })
  .delete(protect, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
