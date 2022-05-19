require('../bdd/connection.js');
var express = require('express');
var request = require('sync-request');
var router = express.Router();

const baseUrl = 'https://api.themoviedb.org/3/';
let adultFilter = false;
let genre = null;
let sort_by = null;

const movieGenre = [
	{
		id: 28,
		name: 'Action',
	},
	{
		id: 12,
		name: 'Aventure',
	},
	{
		id: 16,
		name: 'Animation',
	},
	{
		id: 35,
		name: 'Comédie',
	},
	{
		id: 80,
		name: 'Crime',
	},
	{
		id: 99,
		name: 'Documentaire',
	},
	{
		id: 18,
		name: 'Drame',
	},
	{
		id: 10751,
		name: 'Familial',
	},
	{
		id: 14,
		name: 'Fantastique',
	},
	{
		id: 36,
		name: 'Histoire',
	},
	{
		id: 27,
		name: 'Horreur',
	},
	{
		id: 10402,
		name: 'Musique',
	},
	{
		id: 9648,
		name: 'Mystère',
	},
	{
		id: 10749,
		name: 'Romance',
	},
	{
		id: 878,
		name: 'Science-Fiction',
	},
	{
		id: 10770,
		name: 'Téléfilm',
	},
	{
		id: 53,
		name: 'Thriller',
	},
	{
		id: 10752,
		name: 'Guerre',
	},
	{
		id: 37,
		name: 'Western',
	},
];

//todo  :
//groupe genre a definir pour smiley.
//request nb de page par rapport au nombre de result (front?)

//get movies, filtres adult, smiley, genre.
router.get('/getMovies', async function (req, res, next) {
	const { genre, adultFilter } = req.query;
	console.log(genre);
	const url = `${baseUrl}discover/movie?api_key=${process.env.API_MOVIE_KEY}&language=fr-FR&include_adult=${adultFilter}&with_genres=${genre}&page=1`;
	const response = await request('GET', url);
	const movies = JSON.parse(response.body).results;
	res.json(movies);
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
