var express = require("express");
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose
  .connect(
    "mongodb+srv://meaganbmueller:rosebud560@ui2023.d1ghmxu.mongodb.net/gulpGalore",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "gulpGalore",
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
const UserSchema = new Schema({
  UserId: {
    type: Number,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    //select: false
  },
  phone_number: {
    type: String
  },
  address: {
    city: String,
    state: String,
    street: String,
    zip: String
  },
});

const User = mongoose.model("user", UserSchema);

// // Mongoose test, if fail then will say user not found
// User.findOne({ email: "john.doe@example.com" })
//   .exec()
//   .then((user) => {
//     if (!user) {
//       console.log("no user found");
//       // User not found
//       // return res.render('login', { message: 'Invalid email or password' });
//     }
//   });

console.log("exporting user schema");
module.exports = User;
