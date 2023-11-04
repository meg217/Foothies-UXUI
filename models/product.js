var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose
  .connect(
    "mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//schema for the user login
//UserId, firstName, lastName, email, password, phoneNumber
const ProductSchema = new Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

const Product = mongoose.model("products", UserSchema);

module.exports = Product;
