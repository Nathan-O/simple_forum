var express = require("express");
var passport = require("passport");
var User = require("./../models").User;

// Index all users
// module.exports.index = function (req,res) {
//    User.find({}, function (err, users) {
//       res.json(users);
//    });
// };
//
// module.exports.register = function (req, res) {
//    //
// };
//
// module.exports.login = function (req, res, next) {
//    //
// };
//
// module.exports.logout = function (req, res) {
//    //
// };
//
// module.exports.requireUser = function (req, res, next) {
//    //
// };


///////////////////////////////////////////////////////////////////////////////


// signup, users#create
module.exports.register = function (req, res) {
   console.log("Inside - USER DB CTLR - register()");
  User.register(new User({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);

      return res.status(500).json({err: err});
    }

    console.log(user);

    // Remove sensitive data before login
    user.hash = undefined;
    user.salt = undefined;

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({
                              status: 'Registration successful!',
                              data: user
                          });
    });
  });
};

// signin, sessions#create
module.exports.login = function (req, res, next) {

   console.log("Inside - USER DB CTLR - login()");

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }

    // Remove sensitive data before login
    user.hash = undefined;
    user.salt = undefined;

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({
                              status: 'Login successful!',
                              data: user
                          });
    });
  })(req, res, next);
};

// signout, sessions#destroy
module.exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
};

// Authorize User
module.exports.requireUser = function (req, res, next) {
  if (req.user && req.user._id){
    return next();
  }

  res.status(401).json({err: "Login Required"});
};
