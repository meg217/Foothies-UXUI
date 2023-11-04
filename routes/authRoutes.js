//login and registration user authentication

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
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
               // return res.render('login', { message: 'Invalid email or password' });
            }
            // compare password with hashed password from bcrypt
            bcrypt.compare(password, user.password, (compareErr, isMatch) => {
                if (compareErr || !isMatch) {
                    console.log(user.password);
                    console.log(password);
                   // return res.render('login', { message: 'Invalid email or password' });
                   console.log('password not matched');
                   res.sendFile(path.join(__dirname, '../public', 'login.html'));
                }
                console.log('login successful');
                res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
            });
        })
        .catch(err => {
            console.log('error');
        });
});

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/user/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true,
// }));

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.post('/register', (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    
    // check if user and email already exist
    User.findOne({ email })
        .exec()
        .then(existingUser =>{
            if (existingUser) {
                console.log('user already exists');
                return res.sendFile(path.join(__dirname, '../public', 'register.html'));
            }
        });

    //encrypt the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log('error setting up password');
            return res.sendFile(path.join(__dirname, '../public', 'register.html'));
        }

        // Create a new User and save to db
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            phoneNumber,
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
            res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
        })
        .catch(saveError => {
            console.log('error saving user',saveError);
            res.sendFile(path.join(__dirname, '../public', 'register.html'));
        });
    });
});



module.exports = router;