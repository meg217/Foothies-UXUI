var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

//schema for the user card info
const AddressSchema = new Schema({
  User_Id: {
    type: Number,
    unique: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model("address", UserSchema);

module.exports = Address;
