import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    moodFilter: "",
    ambianceFilter: "",
    genreFilter: "",
    moodList: [],
    moodPlaylist: [],
    displaySmiley: false,
    displayAmbiance: false,
    displayGenre: false,
  },
  reducers: {
    toggleSmiley: (state) => {
      state.displaySmiley = !state.displaySmiley;
    },
    //Search by mood
    addMoodFilter(state, { payload }) {
      state.moodFilter = payload;
    },

    addMoodList(state, { payload }) {
      state.moodList = payload;
    },

    addMoodPlay(state, { payload }) {
      state.moodPlaylist = payload;
    },

    removeMoodFilter(state) {
      state.moodFilter = "";
    },
    //Search by ambiance
    addAmbianceFilter(state, { payload }) {
      state.ambianceFilter = payload;
    },
    toggleAmbianceFilter: (state) => {
      state.displayAmbiance = !state.displayAmbiance;
    },
    removeAmbianceFilter(state) {
      state.ambianceFilter = "";
    },
    //Search by genre
    addGenreFilter(state, { payload }) {
      state.genreFilter = payload;
    },
    toggleGenreFilter: (state) => {
      state.displayGenre = !state.displayGenre;
    },
    removeGenreFilter(state) {
      state.genreFilter = "";
    },
  },
});

export const {
  toggleSmiley,
  addMoodFilter,
  addMoodList,
  addMoodPlay,
  addAmbianceFilter,
  toggleAmbianceFilter,
  removeAmbianceFilter,
  addGenreFilter,
  toggleGenreFilter,
  removeGenreFilter,
  removeMoodFilter,
} = musicSlice.actions;

export default musicSlice.reducer;
