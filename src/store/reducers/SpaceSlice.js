/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const spaceSlice = createSlice({
  name: 'currentSpace',
  initialState: {
    userSpaces: null,
    currentSpace: null,
    isSpacesLoading: false,
    error: null
  },
  reducers: {
    fetchSpacesStart: (state) => {
      state.isSpacesLoading = true;
      state.error = null;
    },

    fetchUserSpacesSuccess: (state, { payload }) => {
      state.userSpaces = payload.spaces;
      state.isSpacesLoading = false;
    },

    fetchSpaceSuccess: (state, { payload }) => {
      state.currentSpace = payload.spaceData;
      state.isSpacesLoading = false;
    },
    fetchSpacesFailure: (state, { payload }) => {
      state.isSpacesLoading = false;
      state.error = payload;
    }
  }
});

export const {
  fetchSpacesStart,
  fetchUserSpacesSuccess,
  fetchSpaceSuccess,
  fetchSpacesFailure
} = spaceSlice.actions;

export default spaceSlice.reducer;
