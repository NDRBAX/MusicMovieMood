var express = require("express");
var request = require("sync-request");
var router = express.Router();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "d2bdd5d7a8msha9bce48871095f7p132a0bjsnc2cac5cbcf46",
  },
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/top", async function (req, res, next) {
  var topRaw = await request(
    "GET",
    "https://spotify23.p.rapidapi.com/charts/?type=regional&country=global&recurrence=daily&date=latest",
    options
  );
  var top = await topRaw.body;
  top = await JSON.parse(top);
  res.json(top);
});
router.get("/filter/mood/:mood", async function (req, res, next) {
  //mood: happy,sad,chill,sleep,romance,dance
  var moodRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.mood}&type=track&offset=0&limit=10&numberOfTopResults=5`,
    options
  );
  var mood = await moodRaw.body;
  mood = await JSON.parse(mood);
  res.json(mood.tracks);
});
module.exports = router;
