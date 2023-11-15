var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const User = require("./user");
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
  },
  card_fullname: {
    type: String,
  },
  card_number: {
    type: Number,
  },
  expiration_date: {
    type: String,
  },
  cvv: {
    type: Number,
  },
});

// // Mongoose test, if fail then will say user not found
// User.findOne({ email: "meaganbmueller@gmail.com" })
//   .exec()
//   .then((user) => {
//     console.log('Found user:', user);
//     console.log('User ID:', user._id);
//     const newCard = new Card({
//       user: user,
//       card_fullname: "Meagan Mueller",
//       card_number: "1231231234",
//       expiration_date: "01/01",
//       cvv: "123",
//       User_Id: user._id,
//     });

//     // Save the card to the database
//     newCard.save()
//       .then(savedCard => {
//         console.log('Card saved:', savedCard);
//       })
//       .catch(err => {
//         console.error('Error saving card:', err);
//         // Handle the error appropriately
//       });
//   })
//   .catch(err => {
//     console.error('Error finding user:', err);
//     // Handle the error appropriately
//   });

const Card = mongoose.model("card", CardInfoSchema);

module.exports = Card;
