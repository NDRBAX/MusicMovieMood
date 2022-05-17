var mongoose = require("mongoose");

// SUB-DOCUMENT MOVIE WISHLIST
var movieSchema = new mongoose.Schema({
  title: String,
  duration: Date,
  genre: String,
  year: Number,
});
// USERSCHEMA
var userSchema = mongoose.Schema({

  email: String,
  password: String,
  token: String,
  rating: Number,
  wishlist: [movieSchema],
});

var userModel = mongoose.model("users", userSchema);
module.exports = userModel;
