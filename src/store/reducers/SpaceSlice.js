/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const spaceSlice = createSlice({
  name: 'currentSpace',
  initialState: {
    userSpaces: null,
    currentSpace: null,

    isSpaceLoading: false,
    isUserSpacesLoading: false,

    isSpaceUpdating: false,
    error: null
  },
  reducers: {
    fetchSpaceUpdateStart: (state) => {
      state.isSpaceUpdating = true;
      state.error = null;
    },
    fetchSpaceUpdateSuccess: (state, { payload }) => {
      state.isSpaceUpdating = false;
      state.currentSpace = payload.spaceData;
    },
    fetchSpaceUpdateFailure: (state, { payload }) => {
      state.isSpaceUpdating = false;
      state.error = payload;
    },

    fetchUserSpacesStart: (state) => {
      state.isUserSpacesLoading = true;
      state.error = null;
    },
    fetchUserSpacesSuccess: (state, { payload }) => {
      state.isUserSpacesLoading = false;
      state.userSpaces = payload.spaces;
    },
    fetchUserSpacesFailure: (state, { payload }) => {
      state.isUserSpacesLoading = false;
      state.error = payload;
    },

    fetchSpaceStart: (state) => {
      state.isSpaceLoading = true;
      state.error = null;
    },
    fetchSpaceSuccess: (state, { payload }) => {
      state.isSpaceLoading = false;
      state.currentSpace = payload.spaceData;
    },
    fetchSpaceFailure: (state, { payload }) => {
      state.isSpaceLoading = false;
      state.error = payload;
    }
  }
});

export const {
  fetchSpaceUpdateStart,
  fetchSpaceUpdateSuccess,
  fetchSpaceUpdateFailure,

  fetchSpaceStart,
  fetchSpaceSuccess,
  fetchSpaceFailure,

  fetchUserSpacesStart,
  fetchUserSpacesSuccess,
  fetchUserSpacesFailure
} = spaceSlice.actions;

export default spaceSlice.reducer;
