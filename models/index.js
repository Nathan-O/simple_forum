var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/forum_app");

module.exports = {
   User: require("./user")
};
