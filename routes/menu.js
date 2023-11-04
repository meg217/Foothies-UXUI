//menu route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public', 'menu.html'));
    //res.render('menu.html');
    Product.find({})
        .then(products => {
            res.render('menu', { products: products });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        })
});

router.get('/:category', (req, res) => {
    const category = req.params.category;
    console.log('Category:', category);
    // Define query
    const query = category ? { category: category } : {};

    // Query the database for products 
    Product.find(query)
        .then(products => {
            console.log('Products:', products);
            res.render('menu', { products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); 
        })
});

//const Product = require('../models/product');

// Get all products
// router.get('/', (req, res) => {
//     Product.find({}, (err, products) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.render('products', { products }); // Render a products view with the list of products
//       }
//     });
//   });
  
//   // Get products by category
//   router.get('/category/:category', (req, res) => {
//     const category = req.params.category;
//     Product.find({ product_category: category }, (err, products) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.render('products', { products }); // Render a products view with the filtered products
//       }
//     });
//   });



module.exports = router;