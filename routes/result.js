const express = require('express');
const router = express.Router();

const Result = require('../models/Result');

router.get('/:competition', async function (req, res) {
  const {competition} = req.params;

  try {
    const results = await Result.find({ competition: competition});
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//! add post

module.exports = router;
