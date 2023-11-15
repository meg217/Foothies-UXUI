//rewards route

const express = require('express');
const router = express.Router();
const path = require('path');

// Display the order page
router.get('/rewards', (req, res) => {
    res.render('rewards.ejs');
  });

  module.exports = router;