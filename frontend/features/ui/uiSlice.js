import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isLoading: true,
	},
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		endLoading: state => {
			state.isLoading = false;
		},
	},
});

export const { startLoading, endLoading } = uiSlice.actions;
export default uiSlice.reducer;
