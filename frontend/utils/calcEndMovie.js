export const calcEndMovie = min => {
	let endMovieMin = new Date().getMinutes();

	let tmin = endMovieMin % 60;
	let thour = new Date().getHours();

	const minutesDuFilm = min % 60;

	const hoursDuFilm = Math.floor(min / 60);

	let totHours = thour + hoursDuFilm;

	let totMinutes = tmin + minutesDuFilm;

	if (totHours >= 24) {
		totHours = totHours - 24;
	}
	if (totMinutes >= 60) {
		totMinutes = totMinutes - 60;
		totHours = totHours + 1;
	}
	if (totMinutes < 10) {
		totMinutes = '0' + totMinutes;
	}

	return `${totHours}h${totMinutes}`;
};
