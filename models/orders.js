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
  const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User model reference
      required: true,
    },
    deliveryAddress: {
        country: String,
        city: String,
        state: String,
        street1: String,
      },
    orderDate: {
      type: Date,
      default: Date.now, // set date to current date
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
          required: true,
        },
        customizations: [String], // Customizations are stored as an array of strings
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },

  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;