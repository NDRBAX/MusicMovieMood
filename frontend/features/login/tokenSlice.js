import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: [],
  },
  reducers: {
    addToken: (state, action) => {
      state.token.push(action.payload);
    },
    removeToken: (state, action) => {
      state.token = state.token.filter((x) => x !== action.payload);
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
