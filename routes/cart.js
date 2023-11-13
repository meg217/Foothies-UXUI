const express = require('express');
const router = express.Router();
const Cart = require('../models/carts'); //

router.get('/', async (req, res) => {
    const cartTotal = req.session.cartTotal || 0;
    const sessionId = req.session.user ? req.session.user.sessionId || 0 : 0;

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
        }

        res.render('cart', { cart });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



       function calculateCartTotal(items) {
        if (Array.isArray(items)) {
          return items.reduce((total, item) => total + item.quantity, 0);
        } else {
          return 0; 
        }
      }

      module.exports = router;