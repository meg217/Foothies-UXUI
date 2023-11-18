//order route

const express = require("express");
const router = express.Router();
const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/carts");
const Order = require("../models/orders");
const mongoose = require("mongoose");
const User = require("../models/user");
const Card = require("../models/cards");

// Display the order page
router.get("/", (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login.html");
  }

  const userId = req.session.user._id;
  let foundUser; // Define user in a broader scope

  // Fetch the user
  User.findById(userId)
    .then((user) => {
      // Assign user to the broader scope variable
      foundUser = user;

      // Fetch the user's saved card from the database
      console.log("userId to find for card:", userId);
      console.log("user to find for card:", user._id);

      // Fetch the user's saved card from the database
      return Card.findOne({ user: user });
    })
    .then((card) => {
      console.log("card found:", card);
      console.log("address:", foundUser.address); // Access user from the broader scope
      console.log("card num:", card ? card.card_number : null);

      if (card && foundUser.address) {
        res.render("orderOpt", {
          savedAddress: foundUser.address,
          savedCard: card,
        });
      } else if (card) {
        res.render("orderOpt", {
          savedAddress: foundUser.address,
          savedCard: card,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// Handle the delivery or pickup option submission
router.post("/options", async (req, res) => {
  const {
    deliveryOption,
    saveAddress,
    street,
    city,
    state,
    cardOption,
    saveCard,
    zip,
    card_fullname,
    card_number,
    expiration_date,
    cvv,
  } = req.body;
  req.session.deliveryOption = deliveryOption;
  req.session.cardOption = cardOption;

  console.log("delivery option:", req.session.deliveryOption);
  console.log("card option:", req.session.cardOption);

  const shouldSaveAddress = saveAddress === "save";
  const shouldSaveCard = saveCard === "save";

  try {
    // Fetch the user to get their current data
    const user = await User.findById(req.session.user._id);

    if (shouldSaveAddress && deliveryOption === "new") {
      // Create a new address object
      const newAddress = {
        city,
        state,
        street,
        zip,
      };

      // Update the user's address in the database
      user.address = newAddress;
    }
    const address = user.address | 0;
    req.session.address = address | 0;

    if (shouldSaveCard && cardOption === "new") {
      // Create a new card object
      const cardNumber = card_number.replace(/\D/g, "");
      const user = await User.findById(req.session.user._id);
      const existingCard = await Card.findOne({ user: user });
      if (existingCard) {
        // Update the existing card
        existingCard.card_fullname = card_fullname;
        existingCard.card_number = Number(cardNumber);
        existingCard.expiration_date = expiration_date;
        existingCard.cvv = cvv;

        // Save the card to the database
        await existingCard.save();
      }
    }
    // const thisUser = await User.findById(req.session.user._id);
    // const card = await Card.findOne({ user: thisUser });

    // Save the updated user to the database
    await user.save();

    // Redirect to the appropriate page
    if (shouldSaveAddress || shouldSaveCard) {
      res.redirect("/orderOpt/submit");
    } else {
      res.redirect("/orderOpt/submit");
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/confirmation", (req, res) => {
  //order confirmation/invoice page and est time delivery or progress bar shown
  req.session.destroy();
  res.render("confirm");
});

router.get("/submit", (req, res) => {
  const { address, card } = req.session;
  // Render the order submission page with order summary
  const deliveryOption = req.session.deliveryOption || "Not selected";
  const deliveryAddress = req.session.address || "Not provided" || address;
  const cart = req.session.cart || [];

  res.render("submit", {
    deliveryAddress,
    card,
    deliveryOption,
    deliveryAddress,
    cart,
  });
});

// Handle the order form submission
router.post("/submit", (req, res) => {
  const { deliveryAddress, totalAmount } = req.body;

  // store order in database
  const newOrder = new Order({
    user: req.session.user._id,
    deliveryOption: req.session.deliveryOption,
    deliveryAddress: deliveryAddress,
    items: req.session.cart,
    totalAmount: totalAmount,
  });

  // Save the order to the database
  newOrder
    .save()
    .then((order) => {
      // Clear the user's cart after the order is placed
      req.session.cart = [];

      // Redirect to a confirmation page or display a success message like "checkmark order comfirmed"
      console.log("Order saved:", order);
      //res.redirect("/orderOpt/confirmation");
      res.render("confirm", {
        totalAmount,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/register");
});

module.exports = router;
