//menu route

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');

router.get('/menu', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public', 'menu.html'));
    //res.render('menu.html');
    Product.find({}, (err, products) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.render('menu', { products: products });
        }
    });
});

router.get('/api/menu/category/:category', (req, res) => {
    const category = req.params.category;
    // Define query
    const query = category ? { category: category } : {};

    // Query the database for products 
    Product.find(query, (err, products) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(products);
        }
    });
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