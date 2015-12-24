




////////////////////////////////////////////////////////////////////


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/forum_app');

module.exports = {
  // Question: require('./question'),
  // Answer: require('./answer'),
  User: require('./user')
};
