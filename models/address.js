var express=require('express');
var mongoose=require('mongoose');
var Schema = mongoose.Schema
mongoose.connect("mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true  })

//schema for the user login
const CheckoutInfoSchema=new Schema({

//userId, street, street2, city, state, adressZip, cardNum, cardZip, cardCode, 



})