require('../bdd/connection.js');
var express = require('express');
var request = require('sync-request');
var router = express.Router();

const baseUrl = 'https://api.themoviedb.org/3/';

//get movies, filtres adult, smiley, genre.
router.get('/getMovies', async function (req, res, next) {
	const { genres, adultFilter, whereFilter } = req.query;

	console.log(genres);
	console.log(adultFilter);
	console.log(whereFilter);

	const url = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&with_genres=${genres}&sort_by=vote_count.desc&page=1`;

	// const url3 = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&with_genres=${genres}&certification_country=FR&certification=10&include_adult=${adultFilter}&page=1`;

	// const url2 = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&with_genres=${genres}&certification_country=FR&certification=${certificate}&sort_by=popularity.desc&include_adult=${adultFilter}&page=1`;

	try {
		const response = await request('GET', url);
		const movies = JSON.parse(response.body).results;
		res.json(movies);
	} catch (err) {
		console.log(err);
	}
});

router.get('/getMoviesPopular', async function (req, res, next) {
	let url = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&sort_by=popularity.desc&page=1`;

	try {
		const response = await request('GET', url);
		const movies = JSON.parse(response.body).results;
		res.json(movies);
	} catch (err) {
		console.log(err);
	}
});

//get providers rent and buy
router.get('/getProviders', async function (req, res, next) {
	// const { id } = req.query;
	//test
	let id = '628';
	const url = `${baseUrl}movie/${id}/watch/providers?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&sort_by=${sort_by}&page=1`;
	const response = await request('GET', url);
	const { FR } = JSON.parse(response.body).results;
	console.log(FR);
	res.json(FR);
});

//get list of  movies in theaters
router.get('/getNowPlaying', async function (req, res, next) {
	const url = `${baseUrl}movie/now_playing?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&region=FR`;
	const response = await request('GET', url);
	const movieListPlaying = JSON.parse(response.body).results;
	console.log(movieListPlaying);
	res.json(movieListPlaying);
});

https: module.exports = router;
