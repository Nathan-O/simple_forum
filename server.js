/*
****************
* Requriements *
****************
*/

var express = require("express");
var session = require("express-session");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var path = require("path");
var ejs = require("ejs");
var passport = require("passport");
var localStrategy = require ("passport-local").Strategy;
// Initialize express in app
var app = express();
// set ejs as template engine
app.set("view engine", "ejs");


// user schema/model
var User = require('./models').User;

// require routes
var api = require('./api');
/*
**********
* Routes *
**********
*/

/*
***********
* section *
***********
*/

/*
**********
* Server *
**********
*/

app.listen(3000, function(){
   console.log("Make it so...");
});





/*


// user schema/model
var User = require('./models').User;

// require routes
var api = require('./api');

// **************
// * MiddleWare *
// **************
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse forms
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'so many questions',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); // angular application

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//**********
// * Routes *
// **********

app.use(api);

app.get(["/", "*"], function(req, res){
  res.send(
     res.render('application.html.ejs', {user: req.user})
  )
});

// **********
// * Errors *
// **********

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


*/
