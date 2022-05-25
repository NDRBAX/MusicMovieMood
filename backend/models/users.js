var mongoose = require("mongoose");

// SUB-DOCUMENT MOVIE WISHLIST
var movieSchema = new mongoose.Schema({
  id: Number,
  runtime: Number,
  title: String,
  genre: [[Object]],
  backdrop_path: String,
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
