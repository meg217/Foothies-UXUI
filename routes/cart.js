const express = require('express');
const router = express.Router();
const Cart = require('../models/carts'); 
const Product = require('../models/product');


router.get('/', async (req, res) => {
    const cartTotal = req.session.cartTotal || 0;
    const sessionId = req.session.user ? req.session.user.sessionId || 0 : 0;
    const productsInCart = [];

    try {
        let cart = await Cart.findOne({ session: sessionId });

        if (!cart) {
            console.log('Cart not found');
            cart = {
                items: [],
                total: 0
            };
        } else {
            console.log('Cart found');
            console.log(cart.items);
            cart.items = cart.items || [];

            for (const cartItem of cart.items) {
                const product = await Product.findById(cartItem.item);
                if (product) {
                    productsInCart.push({
                        ...cartItem.toObject(),
                        product,
                        quantity: cartItem.quantity,
                    });
                }
            }

            cart.items = productsInCart;
            //console.log(cart.items);
            console.log(productsInCart);
        }

        res.render('cart', { cart, productsInCart });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// router.get('/', async (req, res) => {
//     const cartTotal = req.session.cartTotal || 0;
//     const sessionId = req.session.user ? req.session.user.sessionId || 0 : 0;

//     try {
//         let cart = await Cart.findOne({ session: sessionId });

//         if (!cart) {
//             console.log('Cart not found');
//             cart = {
//                 items: [],
//                 total: 0
//             };
//         } else {
//             console.log('Cart found');
//             console.log(cart.items);
//             cart.items = cart.items || [];
//         }

//         res.render('cart', { cart });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



//        function calculateCartTotal(items) {
//         if (Array.isArray(items)) {
//           return items.reduce((total, item) => total + item.quantity, 0);
//         } else {
//           return 0; 
//         }
//       }

      module.exports = router;