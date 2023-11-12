//menu route

const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/product');
const mongoose = require('mongoose');
const Cart = require('../models/carts');
const uuid = require('uuid');

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
            //console.log('Products:', products);
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

router.post('/add-to-cart/:productId', async (req, res) => {
  try {
    console.log('Adding product to cart');
    const productId = req.params.productId;
    console.log('product id:', productId);
    // Get the product details from the database based on the productId
    const product = await Product.findById(productId);

    const sessionId = req.session.user ? req.session.user.sessionId : uuid.v4();

    // Check if the user is authenticated
    if (req.session.user) {
        // User is authenticated, retrieve the user's cart
        console.log('User is authenticated');
        let cart = await Cart.findOne({ session: sessionId });
        
        if (!cart) {
            console.log('Cart not found');
          cart = new Cart({
            user: req.session.user._id,
            session: sessionId,
            items: [],
          });
        }
        console.log('cart:', cart);
  
        const existingItem = cart.items.find(item => item.item.toString() === productId);
  
        if (existingItem) {
          // If the product is already in the cart, increase the quantity
          existingItem.quantity += 1;
        } else {
          // If the product is not in the cart, add it
          cart.items.push({
            item: product._id,
            quantity: 1,
            customizations: [], 
          });
          console.log('cart:', cart);   
        }
        // Save the cart to the database
        await cart.save();
      } else {
        console.log('User is not authenticated');
        // User is not authenticated (guest), handle guest cart logic here
        // For example, you might store the cart in the session
        req.session.guestCart = req.session.guestCart || [];
        console.log('guest cart:', req.session.guestCart);
        const existingItem = req.session.guestCart.find(item => item.item === productId);
  
        if (existingItem) {
          // If the product is already in the guest cart, increase the quantity
          existingItem.quantity += 1;
        } else {
          // If the product is not in the guest cart, add it
          console.log('Adding product to guest cart');
          req.session.guestCart.push({
            item: productId,
            quantity: 1,
            customizations: [], 
          });
          console.log('guest cart:', req.session.guestCart);
        }
      }
  
      // Send a success response
      res.json({ success: true, message: 'Product added to cart' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: 'Error adding product to cart' });
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