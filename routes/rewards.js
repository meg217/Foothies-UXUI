// routes/rewards.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Display the rewards page
router.get("/", (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login.html");
  }

  const userId = req.session.user._id;

  // Fetch the user and their points
  User.findById(userId)
    .then((user) => {
      if (user) {
        // Render the rewards page with the user's points
        res.render("rewards", { points: user.points });
      } else {
        // Handle the case where the user is not found
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
