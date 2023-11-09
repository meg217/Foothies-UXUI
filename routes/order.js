//order route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const mongoose = require('mongoose');

// Display the order page
router.get('/', (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        return res.sendFile(path.join(__dirname, '../public', 'login.html')); // Redirect to login page if not logged in
    }
  
    // Fetch the user's saved address from the database
    const userId = req.user._id; // Assuming you have a user object in req.user
    User.findById(userId)
      .then(user => {
        // Render the order page with the user's saved address
        res.render('order', { savedAddress: user.address });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Handle the order form submission
  router.post('/submit', (req, res) => {
    // Assuming you have a form on the order page with fields for pickup/delivery and address
    const { deliveryOption, deliveryAddress } = req.body;
  
    // Create a new order
    const newOrder = new Order({
      user: req.user._id,
      deliveryOption: deliveryOption,
      deliveryAddress: deliveryOption === 'saved' ? req.user.address : deliveryAddress,
      items: req.session.cart, // Assuming you store the cart in session
      totalAmount: calculateTotalAmount(req.session.cart), // Implement this function
    });
  
    // Save the order to the database
    newOrder.save()
      .then(order => {
        // Clear the user's cart after the order is placed
        req.session.cart = [];
  
        // Redirect to a confirmation page or display a success message
        res.redirect('/order/confirmation');
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Function to calculate the total amount of the order
  function calculateTotalAmount(cart) {
    console.log("will calculate later");
    // Implement your logic to calculate the total amount based on the items in the cart
    // For example, you can iterate over the items in the cart and sum up the prices
  }
  
  module.exports = router;