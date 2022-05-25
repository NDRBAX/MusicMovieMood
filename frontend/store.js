import movieReducer from './features/movie/movieSlice';
import musicReducer from './features/music/musicSlice';
import tokenReducer from './features/login/tokenSlice';
import uiReducer from './features/ui/uiSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		movie: movieReducer,
		music: musicReducer,
		token: tokenReducer,
		ui: uiReducer,
	},
});

export default store;
