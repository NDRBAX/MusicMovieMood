import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
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
		selectedFilters: [],
		moodFilter: '',
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
		toggleSelectedFilter: (state, { payload }) => {
			console.log('--------------toggleselectfilter payload');
			console.log(payload);

			if (!state.selectedFilters.includes(payload)) {
				console.log(
					'---paylod du selectd filter qui n existe pas encore en stock et rentre ds if',
				);
				console.log(payload);
				if (payload == 'mood') {
					if (state.moodFilter !== '') {
						console.log('selected filter');
						console.log(state.selectedFilters);
						state.selectedFilters = [...state.selectedFilters, payload];
					} else {
						return;
					}
				} else {
					state.selectedFilters = [...state.selectedFilters, payload];
				}
			} else {
				state.selectedFilters = state.selectedFilters.filter(filter => filter !== payload);
			}
		},
		toggleSmiley: state => {
			state.displaySmiley = !state.displaySmiley;
		},

		addMoodFilter(state, { payload }) {
			state.moodFilter = payload;
			console.log(state.moodFilter);
		},
		removeMoodFilter(state) {
			state.moodFilter = '';
			state.selectedFilters = state.selectedFilters.filter(filter => filter !== 'mood');
		},
		addPublicFilter(state, { payload }) {
			console.log(state.publicFilter);
			state.publicFilter = !state.publicFilter;
		},
		addWhereFilter(state, { payload }) {
			console.log(state.whereFilter);
			state.whereFilter = !state.whereFilter;
		},
	},
});

export const {
	addToWishlist,
	removeFromWishlist,
	toggleSelectedFilter,
	toggleSmiley,
	addMoodFilter,
	addPublicFilter,
	addWhereFilter,
	removeMoodFilter,
} = movieSlice.actions;
export default movieSlice.reducer;
