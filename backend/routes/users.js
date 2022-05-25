var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");

// SIGNUP
router.post("/signup", async function (req, res, next) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let errors = [];
  let result = false;
  let saveUser = null;
  let token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    errors.push("Veuillez remplir tous les champs.");
  }
  if (reg.test(req.body.emailFromFront) === false) {
    errors.push("L'email est incorrecte.");
  }
  if (data != null) {
    errors.push("Il existe déjà un compte avec cet adresse email.");
  }
  if (req.body.emailFromFront.length < 6) {
    errors.push("Le mot de passe doit contenir au moins six caractères.");
  }
  if (req.body.passwordFromFront !== req.body.confirmPasswordFromFront) {
    errors.push("Les mots de passe ne correspondent pas.");
  }

  var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
  if (errors.length == 0) {
    var newUser = new userModel({
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
      password: hash,
      token: uid2(32),
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  console.log(errors);

  res.json({ result, saveUser, errors, token });
});

// SIGNIN
router.post("/signin", async function (req, res, next) {
  let result = false;
  let user = null;
  let errors = [];
  let token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    errors.push("Veuillez remplir tous les champs.");
  }

  if (errors.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        errors.push("Mot de passe incorrect.");
      }
    } else {
      errors.push("Email incorrecte.");
    }
  }
  res.json({ result, user, errors, token });
});

// ADD MOVIE TO WISHLIST
router.post("/wishlist", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (
    user !== null &&
    !user.wishlist.find((movie) => movie.title === req.body.title)
  ) {
    user.wishlist.push({
      id: req.body.id,
      title: req.body.title,
      runtime: req.body.runtime,
      genre: req.body.genre,
    
      backdrop_path: req.body.backdrop_path,
    });

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});

// GET USER WISHLIST
router.get("/wishlist/:token", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.params.token });
  var movies = [];

  if (user !== null) {
    movies = user.wishlist;
    result = true;
  }

  res.json({ result, movies });
});

// DELETE MOVIES FROM WISHLIST
router.delete("/wishlist", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (user !== null) {
    user.wishlist = user.wishlist.filter((movie) => movie.title !== req.body.title);

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});

module.exports = router;
