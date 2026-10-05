const express = require('express');
const router = express.Router();
const { Certification } = require('../models');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(async (req, res) => {
    const certifications = await Certification.find();
    res.json(certifications);
  })
  .post(protect, async (req, res) => {
    const cert = await Certification.create(req.body);
    res.status(201).json(cert);
  });

router.route('/:id')
  .put(protect, async (req, res) => {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cert);
  })
  .delete(protect, async (req, res) => {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

module.exports = router;
