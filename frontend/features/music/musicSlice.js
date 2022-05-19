import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    moodFilter: "",
    ambianceFilter: false,
    displaySmiley: false,
  },
  reducers: {
    toggleSmiley: (state) => {
      state.displaySmiley = !state.displaySmiley;
    },

    addMoodFilter(state, { payload }) {
      state.moodFilter = payload;
    },
    removeMoodFilter(state) {
      state.moodFilter = "";
    },
    addAmbianceFilter(state) {
      state.ambianceFilter = !state.ambianceFilter;
    },
    addGenreFilter(state) {
      state.ambianceFilter = !state.ambianceFilter;
    },
  },
});

export const {
  toggleSmiley,
  addMoodFilter,
  addAmbianceFilter,
  addGenreFilter,
  removeMoodFilter,
} = musicSlice.actions;
export default musicSlice.reducer;
