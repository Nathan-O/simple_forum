var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
   username: String,
   firstName: String,
   lastName: String,
   password: String,
   dateCreated: {type: Date, default: Date.now()}
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);

module.exports = User;
