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
var bcrypt = require("bcrypt-nodejs");
var path = require("path");
var ejs = require("ejs");
var passport = require("passport");
var localStrategy = require ("passport-local").Strategy;
// Initialize express in app
var app = express();
// set ejs as template engine
app.set("view engine", "ejs");
// require routes js file
var api = require("./routes");
// require Schemas/Models
// user schema/model
var User = require('./models').User;

/*
**************
* Middleware *
**************
*/
// configure middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // parse forms as json
app.use(cookieParser());
app.use(require("express-session")({
   secret: "super super secret",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
// var views = path.join(process.cwd(), "views/");
// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
**********
* Routes *
**********
*/
// directed to use api.js for routes
app.use(api);

// index route
app.get(["/", "*"], function(req, res){
   // res.send(
      res.render("index.html.ejs", {user: req.user});
   // );
});

/*
**************
*  *
**************
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
