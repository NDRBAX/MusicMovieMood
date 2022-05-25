var express = require("express");
var request = require("sync-request");
var router = express.Router();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
  },
};

//tables filtre
var resTop = [];
var resMood = [];
var resAmbiance = [];
var resGenre = [];

//table playlists
var playlists = [];

//detail music
var musicDetails = {};

//test route
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//search music top
router.get("/getTop", async function (req, res, next) {
  resTop = [];
  var topRaw = await request(
    "GET",
    "https://spotify23.p.rapidapi.com/charts/?type=regional&country=global&recurrence=daily&date=latest",
    options
  );
  var top = await topRaw.body;
  top = await JSON.parse(top);
  // var imageRaw=await request("GET",`https://spotify23.p.rapidapi.com/tracks/?ids=${top.content[i].track_id}`, options);
  // var image=await imageRaw.body;
  // image=await JSON.parse(image);
  for (let i = 0; i < 10; i++) {
    resTop.push({
      id: top.content[i].track_id,
      track: top.content[i].track_title,
      cover: top.content[i].thumbnail,
    });
  }
  res.json({ result: true, search: resTop });
});

//filter music by mood
router.get("/mood/:mood", async function (req, res, next) {
  resMood = [];
  if (req.params.mood === "happy" || req.params.mood === "love") {
    var moodRaw = await request(
      "GET",
      `https://spotify23.p.rapidapi.com/search/?q=${req.params.mood}&type=tracks&offset=0&limit=10`,
      options
    );
  } else {
    var moodRaw = await request(
      "GET",
      `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.mood}&type=tracks&offset=0&limit=10`,
      options
    );
  }

  var mood = await moodRaw.body;
  mood = await JSON.parse(mood);
  for (let i = 0; i < mood.tracks.items.length; i++) {
    resMood.push({
      id: mood.tracks.items[i].data.id,
      track: mood.tracks.items[i].data.name,
      cover: mood.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resMood });
});

//filter music by ambiance
router.get("/ambiance/:ambi", async function (req, res, next) {
  resAmbiance = [];
  var ambiRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.ambi}&type=tracks&offset=0&limit=10`,
    options
  );
  var ambi = await ambiRaw.body;
  ambi = await JSON.parse(ambi);
  for (let i = 0; i < ambi.tracks.items.length; i++) {
    resAmbiance.push({
      id: ambi.tracks.items[i].data.id,
      track: ambi.tracks.items[i].data.name,
      cover: ambi.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resAmbiance });
});

//filter music by genre
router.get("/genre/:genre", async function (req, res, next) {
  resGenre = [];
  var genreRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.genre}&type=tracks&offset=0&limit=10`,
    options
  );
  var genre = await genreRaw.body;
  genre = await JSON.parse(genre);
  for (let i = 0; i < genre.tracks.items.length; i++) {
    resGenre.push({
      id: genre.tracks.items[i].data.id,
      track: genre.tracks.items[i].data.name,
      cover: genre.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resGenre });
});

//music details
router.get("/getMusic/:id", async function (req, res, next) {
  musicDetails = {};
  tracksTop = [];
  albums = [];
  var musicRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/tracks/?ids=${req.params.id}`,
    options
  );
  var music = await musicRaw.body;
  music = await JSON.parse(music);
  var tracksRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/artist_overview/?id=${music.tracks[0].artists[0].id}`,
    options
  );
  var tracks = await tracksRaw.body;
  tracks = await JSON.parse(tracks);
  for (let i = 0; i < 3; i++) {
    tracksTop.push({
      title: tracks.data.artist.discography.topTracks.items[i].track.name,
      cover:
        tracks.data.artist.discography.topTracks.items[i].track.album.coverArt
          .sources[1].url,
      artist: music.tracks[0].artists[0].name,
    });
  }
  for (let i = 0; i < tracks.data.artist.discography.albums.items.length; i++) {
    albums.push({
      title:
        tracks.data.artist.discography.albums.items[i].releases.items[0].name,
      cover:
        tracks.data.artist.discography.albums.items[i].releases.items[0]
          .coverArt.sources[0].url,
      artist: music.tracks[0].artists[0].name,
    });
  }
  musicDetails.title = music.tracks[0].name;
  musicDetails.album = music.tracks[0].album.name;
  musicDetails.artist = music.tracks[0].artists[0].name;
  musicDetails.image = music.tracks[0].album.images[0].url;
  musicDetails.link = music.tracks[0].external_urls.spotify;
  //playlists
  res.json({ result: true, tracks: musicDetails, top: tracksTop, albums });
});

//playlist search
router.get("/getPlaylist/:filter", async function (req, res, next) {
  playlists = [];
  var playLRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=${req.params.filter}&type=playlists&offset=0&limit=10`,
    options
  );
  var playL = await playLRaw.body;
  playL = await JSON.parse(playL);
  for (let i = 0; i < playL.playlists.items.length; i++) {
    if (playL.playlists.items[i].data.images) {
      playlists.push({
        name: playL.playlists.items[i].data.name,
        image: playL.playlists.items[i].data.images.items[0].sources[0].url,
      });
    }
  }
  res.json({ result: true, playlists });
});
module.exports = router;
