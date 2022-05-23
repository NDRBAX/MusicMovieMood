require("../bdd/connection.js");
var express = require("express");
var request = require("sync-request");
var router = express.Router();

const baseUrl = "https://api.themoviedb.org/3/";

//get movies, filtres adult, smiley, genre.
router.get("/getMovies", async function (req, res, next) {
  const { genres, adultFilter, whereFilter } = req.query;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&with_genres=${genres}&sort_by=vote_count.desc&page=1`;

  // const url = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&with_genres=${genres}&sort_by=vote_count.desc&page=1`;

  try {
    const response = await request(
      "GET",
      `https://api.themoviedb.org/3/discover/movie?api_key=f0929bf9c301536f2f4ad539f4689057&language=fr-FR&include_adult=${adultFilter}&with_genres=${genres}&sort_by=vote_count.desc&page=1`
    );
    const movies = JSON.parse(response.body).results;
    res.json(movies);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getMoviesPopular", async function (req, res, next) {
  // var url = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&sort_by=popularity.desc&page=1`;
  var url = `https://api.themoviedb.org/3/discover/movie?api_key=f0929bf9c301536f2f4ad539f4689057&language=fr-FR&include_adult=false&page=1`;
  try {
    const response = await request("GET", url);
    const movies = JSON.parse(response.body).results;
    res.json(movies);
  } catch (err) {
    console.log(err);
  }
});

//get providers rent and buy
router.get("/findProvider", async function (req, res, next) {
  const { id } = req.query;
  var url2 = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=f0929bf9c301536f2f4ad539f4689057`;
  try {
    const response = await request("GET", url2);
    const providers = JSON.parse(response.body);
    res.json(providers.results.FR);
  } catch (err) {
    console.log(err);
  }
});

//get list of  movies in theaters
router.get("/getNowPlaying", async function (req, res, next) {
  const url = `${baseUrl}movie/now_playing?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
  const response = await request("GET", url);
  const movieListPlaying = JSON.parse(response.body).results;
  console.log(movieListPlaying);
  res.json(movieListPlaying);
});

router.get("/getDetailsMoviesForWishlist", async function (req, res, next) {
  const { id } = req.query;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=f0929bf9c301536f2f4ad539f4689057`;
  console.log(url);
  try {
    const response = await request("GET", url);
    const movieDetails = JSON.parse(response.body);
    res.json(movieDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getDetailsMovies/:id", async function (req, res, next) {
  const { id } = req.params;
  const url = `${baseUrl}movie/${id}?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
  try {
    const response = await request("GET", url);
    const movieDetails = JSON.parse(response.body);
    res.json(movieDetails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getActorMovies/:id", async function (req, res, next) {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f0929bf9c301536f2f4ad539f4689057`;
  // const url = `${baseUrl}movie/${id}?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
  // console.log(url);
  try {
    const response = await request("GET", url);
    const movieActors = JSON.parse(response.body);
    var actors = movieActors.cast.splice(0, 10);
    res.json(actors);
  } catch (err) {
    console.log(err);
  }
});

https: module.exports = router;
