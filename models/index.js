var mongoose = require("mongoose");
var conn = mongoose.connect("mongodb://localhost/forum_app", function(){
    /* Drop the DB */
   //  mongoose.connection.db.dropDatabase();
   console.log("CONNECTED");
});

// conn.connection.db.dropDatabase();

module.exports = {
   User: require("./user"),
   Post: require("./post")
};
