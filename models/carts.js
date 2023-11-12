var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose
  .connect(
    "mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/gulpGalore",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "gulpGalore",
    }
  )

//schema for the user's cart info
const cartSchema = new Schema({
  session: {
    type: String,
    required: true,
  },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User model reference
        required: true,
      },
      items: [
        {
          item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Product model reference
            required: true,
          },
          quantity: {
            type: Number,
            default: 1, // Default quantity = 1
            required: true,
          },
          customizations: [String], // Customizations are stored as an array of strings
        },
      ],
    });


    
    
    const Cart = mongoose.model("cart", cartSchema);

    module.exports = Cart;