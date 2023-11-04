const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session management ???
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/menu', menuRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Running on this URL: http://localhost:3000/");
});





















// var express=require('express');
// var path=require('path');
// var mongoose=require('mongoose');
// var bodyParser=require('body-parser');
// var session =require('express-session');
// var app=express();
// // var expressValidator=require('express-validator');
// // var fileUpload=require('express-fileupload');
// // const passport = require('passport');
// // const LocalStrategy = require('passport-local').Strategy;
// // var cookieParser = require('cookie-parser')

// //route files
// app.use(express.static(path.join(__dirname, 'public')));
// const authRoutes = require('./routes/authRoutes.js');
// const userRoutes = require('./routes/user.js');

// app.set('public',path.join(__dirname,'public'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// // //Get Page Model
// // var Schema=require('./models/page');
// // var Page= mongoose.model("Pages",Schema);

// //get category model                
// var Schema1=require('./models/user');
// var Category= mongoose.model("user",Schema1);

// app.use(fileUpload());
// app.use(cookieParser());
// app.use('/routes', authRoutes);
// app.use('/routes', userRoutes);
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//   }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('*',async function(req,res,next){
//     res.locals.cart=req.session.cart;
//     res.locals.user=req.user||null;
//     next();
// })

// //var pages=require('./routes/pages.js');
// var user=require('./routes/user.js');

// app.use('/user',user);

// app.get('/', (req, res) => {
//     //res.send('Welcome to the homepage');
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/public/login.html');
// });

// app.post('/login', (req, res) => {
//     // Authentication logic here
// });

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//       // Implement your logic for verifying username and password here
//       // Find the user by their username (email in your case) and verify the password
//       User.findOne({ email: username }, (err, user) => {
//         if (err) return done(err);
//         if (!user) return done(null, false);
//         if (!bcrypt.compareSync(password, user.password)) return done(null, false);
//         return done(null, user);
//       });
//     }
//   ));

//   passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });
  
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
