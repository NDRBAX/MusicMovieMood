import movieReducer from "./features/movie/movieSlice";
import musicReducer from "./features/music/musicSlice";

//REDUX
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    // movielist: movielistReducer,
    music: musicReducer,
  },
});

export default store;
