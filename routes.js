/*
**********
* Routes *
**********
*/

var express = require("express");
var api = express.Router();
/*
NOTE: Also add all controllers that will require routes
EXAMPLE:
var usersCtrl = require("./controllers/users_controller");
*/
var usersCtrl = require("./controllers/users_controller");
var postsCtrl = require("./controllers/posts_controller");

// User & Session routes
api.get('/api/users', usersCtrl.index);
api.post('/api/user/register', usersCtrl.register);
api.post('/api/user/login', usersCtrl.login);
api.get('/api/user/logout', usersCtrl.logout);

api.delete("/api/users/:id", usersCtrl.destroy);

// Post routes
api.get("/api/posts", postsCtrl.index);
api.post("/api/posts", postsCtrl.create);

api.delete("/api/posts/:id", postsCtrl.destroy);


// other controller routes *****

module.exports = api;





/*

var express = require('express'),
    api = express.Router(),
    questionsCtrl = require('./controllers/questions_controller'),
    answersCtrl = require('./controllers/answers_controller'),
    usersCtrl = require('./controllers/users_controller')

**************
* API ROUTES *
**************


// questions
api.get('/api/questions', questionsCtrl.index);
api.post('/api/questions', questionsCtrl.create);
api.get('/api/questions/:id', questionsCtrl.show);
api.put('/api/questions/:id', questionsCtrl.update);
api.delete('/api/questions/:id', questionsCtrl.destroy);

// answers
api.post('/api/questions/:questionId/answers', answersCtrl.create);
api.put('/api/questions/:questionId/answers/:id', answersCtrl.update);
api.delete('/api/questions/:questionId/answers/:id', answersCtrl.destroy);

module.exports = api;

*/
