const express = require('express');
const router = express.Router();
const { Profile } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile || {});
});

router.put('/', protect, async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
  }
  res.json(profile);
});
module.exports = router;
