import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
<<<<<<< HEAD
	name: 'movie',
	initialState: {
		wishList: [
			{
				title: 'Le renard fou',
				length: '2h10',
				year: '2020',
			},
			{
				title: 'Le renard fou',
				length: '2h10',
				year: '2020',
			},
		],
		moviesFetch: [],
		moviesNow: [],
		moviesPopular: [],
		moodFilter: '',
		moodGenre: '',
		publicFilter: false,
		whereFilter: false,
		displaySmiley: false,
	},
	reducers: {
		//ADD MOVIE TO WISHLIST
		addToWishlist: (state, action) => {
			state.movies.push(action.payload);
		},
		//REMOVE ITEM FROM WISHLIST
		removeFromWishlist: (state, action) => {
			state.movies = state.movies.filter(movie => movie._id !== action.payload._id);
		},

		toggleSmiley: state => {
			state.displaySmiley = !state.displaySmiley;
		},

		addMoodFilter(state, action) {
			//plutot un toggle
			console.log(action.payload);
			const { name, genre } = action.payload;

			state.moodFilter = name;
			state.moodGenre = genre;
		},
		removeMoodFilter(state) {
			state.moodFilter = '';
		},
		addPublicFilter(state) {
			state.publicFilter = !state.publicFilter;
			state.publicFilter === true && (state.moodGenre = '10751');
			state.publicFilter === false && (state.moodGenre = '');
		},

		addWhereFilter(state) {
			state.whereFilter = !state.whereFilter;
		},
		addMovieFetch(state, { payload }) {
			state.moviesFetch = payload;
		},
		addMoviePopularFetch(state, { payload }) {
			state.moviesPopular = payload;
		},
	},
});

export const {
	addToWishlist,
	removeFromWishlist,
	toggleSmiley,
	addMoodFilter,
	addPublicFilter,
	addWhereFilter,
	removeMoodFilter,
	addMovieFetch,
	addMoviePopularFetch,
=======
  name: "movie",
  initialState: {
    wishList: [
      {
        title: "Le renard fou",
        length: "2h10",
        year: "2020",
      },
      {
        title: "Le renard fou",
        length: "2h10",
        year: "2020",
      },
    ],
    moodFilter: "",
    publicFilter: false,
    whereFilter: false,
    displaySmiley: false,
  },
  reducers: {
    //ADD MOVIE TO WISHLIST
    addToWishlist: (state, action) => {
      state.movies.push(action.payload);
    },
    //REMOVE ITEM FROM WISHLIST
    removeFromWishlist: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload._id
      );
    },

    toggleSmiley: (state) => {
      state.displaySmiley = !state.displaySmiley;
    },

    addMoodFilter(state, { payload }) {
      state.moodFilter = payload;
    },
    removeMoodFilter(state) {
      state.moodFilter = "";
    },
    addPublicFilter(state) {
      state.publicFilter = !state.publicFilter;
    },

    addWhereFilter(state) {
      state.whereFilter = !state.whereFilter;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleSmiley,
  addMoodFilter,
  addPublicFilter,
  addWhereFilter,
  removeMoodFilter,
>>>>>>> filter_music
} = movieSlice.actions;
export default movieSlice.reducer;
