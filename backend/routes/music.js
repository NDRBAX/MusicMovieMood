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

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
//search music top
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
//filter music by mood
router.get("/mood/:mood", async function (req, res, next) {
  //mood: happy,sad,chill,sleep,romance,dance
  var moodRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.mood}&type=tracks&offset=0&limit=10`,
    options
  );
  var mood = await moodRaw.body;
  mood = await JSON.parse(mood);
  res.json(mood.tracks);
});
//filter music by ambiance
router.get("/ambiance/:ambi", async function (req, res, next) {
  //ambiance: study, party, summer, rainy-day, work-out, acoustic
  var ambiRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.ambi}&type=tracks&offset=0&limit=10`,
    options
  );
  var ambi = await ambiRaw.body;
  ambi = await JSON.parse(ambi);
  res.json(ambi.tracks);
});
//filter music by genre
router.get("/genre/:genre", async function (req, res, next) {
  //genre: pop, rock, latino, edm, hip-hop, r-n-b, jazz, soul,classical, indie
  var genreRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.genre}&type=tracks&offset=0&limit=10`,
    options
  );
  var genre = await genreRaw.body;
  genre = await JSON.parse(genre);
  res.json(genre.tracks);
});
module.exports = router;
