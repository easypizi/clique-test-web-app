/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const spaceGroups = createSlice({
  name: 'spaceGroups',
  initialState: {
    isGroupDataUpdating: false,
    isGroupDataUpdated: false,
    error: null
  },
  reducers: {
    resetGroupDataStateUpdate: (state) => {
      state.isGroupDataUpdating = false;
      state.isGroupDataUpdated = false;
      state.error = null;
    },
    fetchGroupUpdateStart: (state) => {
      state.isGroupDataUpdating = true;
      state.isGroupDataUpdated = false;
      state.error = null;
    },
    fetchGroupUpdateSuccess: (state) => {
      state.isGroupDataUpdating = false;
      state.isGroupDataUpdated = true;
      state.error = null;
    },
    fetchGroupUpdateFailure: (state, { payload }) => {
      state.isGroupDataUpdating = false;
      state.isGroupDataUpdated = false;
      state.error = payload;
    }
  }
});

export const {
  fetchGroupUpdateStart,
  fetchGroupUpdateFailure,
  fetchGroupUpdateSuccess,
  resetGroupDataStateUpdate
} = spaceGroups.actions;

export default spaceGroups.reducer;
