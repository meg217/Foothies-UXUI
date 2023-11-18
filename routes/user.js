const express = require('express');
const router = express.Router();
const User = require('../models/user');
const path = require('path');

// Middleware for checking user authentication
const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated, for example, by verifying a session
  if (req.session.user) {
    return next(); // User is authenticated, proceed to the route handler
  }
  res.redirect('/auth/login'); // User is not authenticated, redirect to the login page
};



router.get('/profile', isAuthenticated, (req, res) => {
  // Render the user's profile, retrieve user data, and serve appropriate pages
  res.render('profile', { user: req.session.user });
});

router.get('/settings', isAuthenticated, (req, res) => {
  // Render user settings
  res.render('settings', { user: req.session.user });
});

module.exports = router;











// const express = require('express');
// const router = express.Router();
// var mongoose=require('mongoose');
// // const fileUpload = require('express-fileupload');
// // var passport=require('passport');
// var bcrypt=require('bcrypt');
// const path = require('path');

// var Schema1 = require('../models/user')
// var User = mongoose.model("users",Schema1);

// // Middleware for checking user authentication
// const isAuthenticated = (req, res, next) => {
//   // Check if the user is authenticated, for example, by verifying a session or a user token
//   if (req.session && req.session.user) {
//     return next(); // User is authenticated, proceed to the route handler
//   }
//   res.redirect('/login'); // User is not authenticated, redirect to the login page
// };

// // User Profile Route
// router.get('/profile', isAuthenticated, (req, res) => {
//   // Render the user's profile, you can fetch user data from the database
//   // For example, you can retrieve the user data using the user's ID from the session
//   User.findById(req.session.user._id, (err, user) => {
//     if (err) {
//       // Handle errors
//     }
//     res.render('profile', { user });
//   });
// });

// // User Settings Route
// router.get('/settings', isAuthenticated, (req, res) => {
//   // Render the user settings page
//   res.render('settings');
// });

// module.exports = router;