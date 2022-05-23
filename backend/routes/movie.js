require("../bdd/connection.js");
var express = require("express");
var request = require("sync-request");
var router = express.Router();

const baseUrl = "https://api.themoviedb.org/3/";

//get movies, filtres adult, smiley, genre.
router.get("/getMovies", async function (req, res, next) {
  const { genres, adultFilter, whereFilter } = req.query;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=f0929bf9c301536f2f4ad539f4689057&language=fr-FR&include_adult=${adultFilter}&with_genres=${genres}&sort_by=vote_count.desc&page=1`;

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
  var url = `https://api.themoviedb.org/3/discover/movie?api_key=f0929bf9c301536f2f4ad539f4689057&language=fr-FR&include_adult=false&sort_by=popularity_desc&page=1`;
  try {
    const response = await request("GET", url);
    const movies = JSON.parse(response.body).results;
    res.json(movies);
  } catch (err) {
    console.log(err);
  }
});

//get providers rent and buy
router.get("/getProviders", async function (req, res, next) {
  // const { id } = req.query;
  //test
  let id = "628";
  const url = `${baseUrl}movie/${id}/watch/providers?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&sort_by=${sort_by}&page=1`;

  const response = await request("GET", url);
  const { FR } = JSON.parse(response.body).results;
  console.log(FR);
  res.json(FR);
});

//get list of  movies in theaters
router.get("/getNowPlaying", async function (req, res, next) {
  const url = `${baseUrl}movie/now_playing?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
  const response = await request("GET", url);
  const movieListPlaying = JSON.parse(response.body).results;
  console.log(movieListPlaying);
  res.json(movieListPlaying);
});

router.get("/getDetailsMovies", async function (req, res, next) {
  const { id } = req.query;
  const url = `${baseUrl}movie/${id}?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
  try {
    const response = await request("GET", url);
    const movieDetails = JSON.parse(response.body);
    res.json(movieDetails);
  } catch (err) {
    console.log(err);
  }
});

https: module.exports = router;
