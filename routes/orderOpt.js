//order route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const Cart = require('../models/carts');
const Order = require('../models/orders'); 
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
        // check if adress is null for the neew address section
        const showNewAddressInput = user.address === null;

        if (user.address !== null) {
          res.render('orderOpt', { savedAddress: user.address, showNewAddressInput });
        } else {
          res.render('orderOpt', { showNewAddressInput });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  // Handle the delivery or pickup option submission
  router.post('/options', (req, res) => {
    const { deliveryOption, saveAddress, street, city, state, zip } = req.body;
    req.session.deliveryOption = deliveryOption;
    //req.session.deliveryAddress = { street, city, state, zip };
    console.log('delivery option:', req.session.deliveryOption);

    const shouldSaveAddress = saveAddress === 'save';

    //check for the save adress check box
    if (shouldSaveAddress && deliveryOption === 'new') {
      const newAddress = {
        city,
        state,
        street,
        zip,
      };

      // Save the user's address to the database
      User.findByIdAndUpdate(req.session.user._id, { address: newAddress }, { new: true })
        .then(updatedUser => {
          // User's address updated successfully
          console.log('User address updated:', updatedUser.address);
          res.redirect('/order/submit'); //redirect to order confirmation
        })
        .catch(err => {
          console.error('Error updating user address:', err);
        });
    } else {
    // Redirect to the menu page to browse products
    res.redirect('/menu/all');
    }
  });

  router.get('/confirmation', (req, res) => {
    //order confirmation/invoice page and est time delivery or progress bar shown
    res.render('confirmation');
  });

  router.get('/submit', (req, res) => {
    //order submission page for credit card entry 
    res.render('submit');
  });

  
  // Handle the order form submission
  router.post('/submit', (req, res) => {
    const { creditCard, expirationDate, cvv } = req.body;
        const { deliveryAddress } = req.body;
  
    //add credit card to cards schema if not already in there and if user wants to save it for future orders
    //if user does not want to save it, then just add the card to the order schema
    
  
    // Create a new card schema with the user's credit card information
    
    const Card = mongoose.model('Card', {
      creditCard: String,
      expirationDate: String,
      cvv: String,
    });

    // Create a new order
    const newOrder = new Order({
      user: req.session.user._id,
      deliveryOption: req.session.deliveryOption,
      deliveryAddress: req.session.deliveryAddress,
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
    //make function to iterate over cart items and add total
  }
  
  module.exports = router;