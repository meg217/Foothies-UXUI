//contact route

const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose')
const Contact = require('../models/contactForms');

// Display the order page


router.get('/', (req, res) => {
    res.render('contact');
  });


router.post('/submit', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, message } = req.body;
  
    // Create a new instance of the Contact model with form data
    const newContact = new Contact({
      name,
      email,
      message,
    });
  
    // Save the new contact form submission to the database
    const savedContact = await newContact.save();
  
    // Respond with success message or appropriate response
    res.status(200).json({ message: 'Contact form submitted successfully', savedContact });
  } catch (error) {
    // Handle errors if any occurred during the process
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});
  
module.exports = router;