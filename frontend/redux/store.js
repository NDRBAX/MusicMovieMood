import wishlistReducer from "./wishlist";
import movielistReducer from "./movielist";
import musiclistReducer from "./musiclist";

//REDUX
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    // movielist: movielistReducer,
    // musiclist: musiclistReducer,
  },
});

export default store;
