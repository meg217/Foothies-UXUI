//order route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const mongoose = require('mongoose');
const User = require('../models/user');

// Display the order page
router.get('/', (req, res) => {
    
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect('/login.html');
    }
  
    // Fetch the user's saved address from the database
    const userId = req.session.user._id; 
    User.findById(userId)
      .then(user => {
        // Render the order page with the saved address
        res.render('order', { savedAddress: user.address });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Handle the delivery or pickup option submission
  router.post('/options', (req, res) => {
    const { deliveryOption } = req.body;
    req.session.deliveryOption = deliveryOption;
    // Redirect to the menu page to browse products
    res.redirect('/menu');
  });
  
  // Handle the order form submission
  router.post('/submit', (req, res) => {
        const { deliveryAddress } = req.body;
  
    // Create a new order
    const newOrder = new Order({
      user: req.session.user._id,
      deliveryOption: req.session.deliveryOption,
      deliveryAddress: req.session.deliveryOption === 'saved' ? req.session.user.address : deliveryAddress,
      items: req.session.cart, 
      totalAmount: calculateTotalAmount(req.session.cart), 
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
    // Implement your logic to calculate the total amount based on the items in the cart
    // For example, you can iterate over the items in the cart and sum up the prices
  }
  
  module.exports = router;