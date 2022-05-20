import movieReducer from "./features/movie/movieSlice";
import musicReducer from "./features/music/musicSlice";
import tokenReducer from "./features/login/tokenSlice";
//REDUX
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    // movielist: movielistReducer,
    music: musicReducer,
    token: tokenReducer,
  },
});

export default store;
