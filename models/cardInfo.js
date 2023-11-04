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

//schema for the user card info
const CardInfoSchema = new Schema({
  User_Id: {
    type: Number,
    unique: true,
  },
  card_fullname: {
    type: String,
    required: true,
  },
  card_number: {
    type: Number,
    required: true,
    unique: true,
  },
  expiration_date: {
    type: String,
    required: true,
  },
  cvv_cvc: {
    type: Number,
    required: true,
  },
  billing_address: {
    country: String,
    city: String,
    state: String,
    street: String,
    zip: Number,
  },
});

const Address = mongoose.model("address", UserSchema);

module.exports = Address;
