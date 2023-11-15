//rewards route

const express = require('express');
const router = express.Router();
const path = require('path');

// Display the order page
router.get('/', (req, res) => {
    res.render('rewards');
  });

  module.exports = router;