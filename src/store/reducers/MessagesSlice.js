/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    activeFilters: []
  },
  reducers: {
    setActiveFilters: (state, { payload }) => {
      state.activeFilters = payload;
    }
  }
});

export const { setActiveFilters } = messagesSlice.actions;

export default messagesSlice.reducer;
