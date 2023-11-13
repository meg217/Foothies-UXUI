const express = require("express");
const router = express.Router();
const Product = require("../models/product");
// Middleware for checking user authentication
// const isAuthenticated = (req, res, next) => {
//   // Check if the user is authenticated, for example, by verifying a session
//   if (req.session.user) {
//     return next(); // User is authenticated, proceed to the route handler
//   }
//   res.redirect('/auth/login'); // User is not authenticated, redirect to the login page
// };

router.get("/:productName", (req, res) => {
  //res.sendFile(path.join(__dirname, '../public', 'menu.html'));
  //res.render('menu.html');
  const sessionId = req.session.user ? req.session.user.sessionId || 0 : 0;
  const cartTotal = req.session.cartTotal || 0;
  const name = req.params.productName;
  const query = name ? { name: name } : {};
  console.log("productName:", name);
  Product.find( query )
    .then((products) => {
      console.log(products);
      res.render("product", { products, sessionId, cartTotal });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;

