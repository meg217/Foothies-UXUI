//menu route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const mongoose = require('mongoose');

// router.get('/all', (req, res) => {
//     //res.sendFile(path.join(__dirname, '../public', 'menu.html'));
//     //res.render('menu.html');
//     const category = "all";
//     Product.find({})
//         .then(products => {
//             res.render('menu', { products: products, category });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         })
// });

router.get('/:category', (req, res) => {
    const sortPrice = '';
    const sortCal = '';
    const category = req.params.category;
    if(category == 'all'){
        Product.find({})
        .then(products => {
            res.render('menu', { products: products, category, sortPrice, sortCal });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        })
    }
    else{
    console.log('Category:', category);
    // Define query
    const query = category ? { category: category } : {};

    // Query the database for products 
    Product.find(query)
        .then(products => {
            console.log('Products:', products);
            res.render('menu', { products, category, sortPrice, sortCal });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); 
        })
    }
});

router.get('/:category/filter', async (req, res) => {
    try {
        const category = req.params.category;
        let sortPrice= '';
        let sortCal= '';
        console.log('Category:', category);

        let query = {};

        if (category !== 'all') {
            query.category = category;
        }

        // Handle sorting
        let sortOption = {};

        if (req.query.sortByPrice === 'lowToHigh') {
            sortPrice = 'Low to High';
            sortOption.price = 1;
        } else if (req.query.sortByPrice === 'highToLow') {
            sortPrice = 'High to Low';
            sortOption.price = -1;
        }

        if (req.query.sortByCalories === 'lowToHigh') {
            sortCal = 'Low to High';
            sortOption.calories = 1;
        } else if (req.query.sortByCalories === 'highToLow') {
            sortCal = 'High to Low';
            sortOption.calories = -1;
        }

        // Handle searching
        if (req.query.search) {
            const searchTerm = new RegExp(req.query.search, 'i');
            query.$or = [{ name: searchTerm }, { ingredients: searchTerm }, {long_description: searchTerm}];
        }

        const products = await Product.find(query).sort(sortOption);
        res.render('menu', {
            products,
            category,
            sortByPrice: req.query.sortByPrice,
            sortByCalories: req.query.sortByCalories,
            sortPrice,
            sortCal,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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