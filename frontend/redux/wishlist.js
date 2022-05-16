import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    movies: [
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

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
