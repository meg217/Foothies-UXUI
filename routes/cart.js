// cartRoute.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Retrieve the cart information from the session or database
    const cart = req.session.cart || [];

    // Render the cart EJS template and pass the cart data
    res.render('cart', { cart });
});

module.exports = router;
