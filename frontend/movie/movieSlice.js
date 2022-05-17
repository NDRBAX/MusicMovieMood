import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [
      {
        title: "Le renard fou",
        duration: "2h10",
        genre: "Comédie",
        year: "2020",
      },
      {
        title: "Le renard fou",
        duration: "2h10",
        genre: "Comédie",
        year: "2020",
      },
    ],
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
  },
});

export const { addToWishlist, removeFromWishlist } = movieSlice.actions;
export default movieSlice.reducer;
