//order route

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('render order template');
    res.render('/login.html'); // Render the template for user choice
});

// router.post('/', (req, res) => {
//     const choice = req.body.choice;

//     // Handle the user's choice and set appropriate session variables
//     if (choice === 'guest') {
//         req.session.userType = 'guest';
//         req.session.guestCart = req.session.guestCart || [];
//         res.redirect('/menu');
//     } else if (choice === 'login') {
//         req.session.userType = 'login';
//         req.session.productIdToAdd = req.body.productId;
//         res.redirect('/login');
//     } else if (choice === 'signup') {
//         req.session.productIdToAdd = req.body.productId;
//         req.session.userType = 'signup';
//         res.redirect('/signup');
//     }

//     // Redirect back to the menu or any other desired page
//     res.redirect('/menu/all');
// });

module.exports = router;
