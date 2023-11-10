//login and registration user authentication

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');


router.get('/login', (req, res) => {
    return res.redirect('/login.html');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Mongoose
    User.findOne({ email })
        .exec()
        .then(user =>{
            if (!user) {
               console.log('no user found');
                // User not found
                return res.redirect('/login.html');
            }
            // compare password with hashed password from bcrypt
            bcrypt.compare(password, user.password, (compareErr, isMatch) => {
                if (compareErr || !isMatch) {
                   // return res.render('login', { message: 'Invalid email or password' });
                   console.log('password not matched');
                   return res.redirect('/login.html');
                }
                req.session.user = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                  };
                console.log('login successful');
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
});

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/user/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true,
// }));

router.get('/register', (req, res) => {
    return res.redirect('/register.html');
});

router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;
    
    // check if user and email already exist
    User.findOne({ email })
        .exec()
        .then(existingUser =>{
            if (existingUser) {
                console.log('user already exists');
                //return res.sendFile(path.join(__dirname, '../public', 'register.html'));
                return res.redirect('/register.html');
            }
        });

    //encrypt the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log('error setting up password');
            return res.redirect('/register.html');
        }

        // Create a new User and save to db
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hash,
            phone_number,
            address: {
                country: null,
                city: null,
                state: null,
                street1: null
            }
        });


        //catch new user save error
        newUser.save()
        .then(() => {
            console.log('Registration successful');
            req.session.user = {
                _id: newUser._id,
                first_name,
                last_name,
                email
            };
            res.redirect('/');
        })
        .catch(saveError => {
            console.log('error saving user',saveError);
            return res.redirect('/register.html');
        });
    });
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.redirect('/');
      }
      res.redirect('/');
    });
  });



module.exports = router;