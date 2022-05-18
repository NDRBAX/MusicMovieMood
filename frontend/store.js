import movieReducer from './features/movie/movieSlice';

//REDUX
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		movie: movieReducer,
		// movielist: movielistReducer,
		// musiclist: musiclistReducer,
	},
});

export default store;
