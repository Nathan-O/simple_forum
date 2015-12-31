var express = require("express");
var passport = require("passport");
var Post = require("./../models").Post;


// Index all posts
module.exports.index = function (req, res) {
   Post.find({}, function (err, posts) {
      res.json(posts);
   });
};

// Create new post
module.exports.create = function(req, res) {
   console.log("||| --- Inside - POST DB CTRL - Create --- |||");
   console.log(req.body);
   var postData = req.body;
   var newPost = new Post({title: postData.title, content: postData.content});

   newPost.save(function (err, savedPost) {
      if (err) {
         console.log(err);
         // res.status(422).send(err.errors.text.message);
         res.status(422).send(err);
      } else {
         console.log("saved");
         res.json(savedPost);
      }
   });
};


// Delete post
module.exports.destroy = function(req, res) {
   var targetId = req.params.id;

   Post.findOneAndRemove({_id: targetId}, function(err, delPost) {
      res.json(delPost);
   });
};
