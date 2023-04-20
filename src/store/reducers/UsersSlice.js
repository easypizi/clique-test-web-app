/* eslint-disable no-param-reassign */
import md5 from 'md5';
import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    isAuthorized: false,
    currentUser: null,
    isUserDataLoading: false,
    isUserDataUpdating: false,
    isUserDataUpdated: false,
    error: null
  },
  reducers: {
    resetCurrentUserUpdateStates: (state) => {
      state.isUserDataUpdating = false;
      state.isUserDataUpdated = false;
      state.error = null;
    },
    fetchCurrentUserUpdateStart: (state) => {
      state.isUserDataUpdating = true;
      state.isUserDataUpdated = false;
      state.error = null;
    },
    fetchCurrentUserUpdateSuccess: (state) => {
      state.isUserDataUpdating = false;
      state.isUserDataUpdated = true;
      state.error = null;
    },
    fetchCurrentUserUpdateFailure: (state, { payload }) => {
      state.isUserDataUpdating = false;
      state.isUserDataUpdated = false;
      state.error = payload;
    },
    fetchCurrentUserStart: (state) => {
      state.isUserDataLoading = true;
      state.error = null;
    },
    fetchCurrentUserSuccess: (state, { payload }) => {
      state.currentUser = payload.userData;
      state.isAuthorized =
        payload.userData &&
        payload.userData.user_id &&
        md5(payload.userData.user_id) === payload.privateId;
      state.isUserDataLoading = false;
    },
    fetchCurrentUserFailure: (state, { payload }) => {
      state.isUserDataLoading = false;
      state.error = payload;
    }
  }
});

export const {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchCurrentUserUpdateStart,
  fetchCurrentUserUpdateSuccess,
  fetchCurrentUserUpdateFailure,
  resetCurrentUserUpdateStates
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
