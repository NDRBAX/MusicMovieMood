import movieReducer from "./features/movie/movieSlice";
import tokenReducer from "./features/login/tokenSlice"

//REDUX
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movie: movieReducer,
	token: tokenReducer,
    // movielist: movielistReducer,
    // musiclist: musiclistReducer,
  },
});

export default store;
