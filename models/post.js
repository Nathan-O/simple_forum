var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var PostSchema = new Schema({
   title: String,
   content: String,
   // author: String,
   dateCreated: {type: Date, default: Date.now()}
});

PostSchema.plugin(passportLocalMongoose);

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
