var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/gulpGalore",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "gulpGalore",
  }
);

//schema for the user login
//UserId, firstName, lastName, email, password, phoneNumber
const ProductSchema = new Schema({
  id: {
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
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  long_description: {
    type: String,
    required: true,
    unique: true,
  },
  calories: {
    type: Number,
  },
  ingredients: {
    type: Array,
  },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
