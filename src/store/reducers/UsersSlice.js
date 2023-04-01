/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  reducers: {
    fetchUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    fetchUsersFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export default usersSlice.reducer;
