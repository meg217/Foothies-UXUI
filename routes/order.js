//order route

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
            res.render('order', { products: products });
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
            res.render('order', { products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); 
        })
});


module.exports = router;