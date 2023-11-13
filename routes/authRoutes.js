//login and registration user authentication

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');
const uuid = require('uuid');

router.get('/guest', async (req, res) => {
    try {
      // Create a new user with a guest ID
      const guestUser = new User({
        first_name: 'Guest',
        last_name: 'Account',
        password: '1234',
        email: `${uuid.v4()}guest@example.com`,
      });
  
      // Save the new user to the database
      await guestUser.save();
  
      // Initialize guest session
      req.session.user = {
        sessionId: uuid.v4(),
        _id: guestUser._id,
        first_name: guestUser.first_name,
        last_name: guestUser.last_name,
        email: guestUser.email,
      };
  
      console.log('Session for guest:', req.session);
      res.redirect('/menu/all');
    } catch (error) {
      console.error('Error creating guest user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/login', (req, res) => {
    if (req.session.user) {
        console.log('user already logged in');
        return res.redirect('/menu/all');
    }
    else{
        console.log('user not logged in');
    return res.redirect('/login.html');
    }
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
                return res.redirect('/login.html?error=User not found');
            }
            // compare password with hashed password from bcrypt
            bcrypt.compare(password, user.password, (compareErr, isMatch) => {
                if (compareErr || !isMatch) {
                   // return res.render('login', { message: 'Invalid email or password' });
                   console.log('password not matched');
                   return res.redirect('/login.html?error=Password is not a match');
                }
                //console.log(user);
                console.log(user._id);
                req.session.user = {
                    sessionId: uuid.v4(),
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                  };
                console.log('Session after login:', req.session);
                console.log('login successful');
                res.redirect('/menu/all');
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
                return res.redirect('/login.html');
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
                city: null,
                state: null,
                street: null,
                zip:null
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
            res.redirect('/menu/all');
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
  
      // Regenerate a new session
      req.session = null;
        res.redirect('/');
      });
    });



module.exports = router;