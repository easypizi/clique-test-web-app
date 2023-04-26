/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    isEventCreating: false,
    isEventVeryficationSending: false,
    isEventDeleting: false,
    error: false
  },
  reducers: {
    fetchEventCreateStart: (state) => {
      state.isEventCreating = true;
      state.error = false;
    },
    fetchEventCreateSuccess: (state) => {
      state.isEventCreating = false;
      state.error = false;
    },
    fetchEventCreateFailure: (state, { payload }) => {
      state.isEventCreating = false;
      state.error = payload;
    },
    fetchEventSendToVerificationStart: (state) => {
      state.isEventVeryficationSending = true;
      state.error = false;
    },
    fetchEventSendToVerificationSuccess: (state) => {
      state.isEventVeryficationSending = false;
      state.error = false;
    },
    fetchEventSendToVerificationFailure: (state, { payload }) => {
      state.isEventVeryficationSending = false;
      state.error = payload;
    },
    fetchEventDeleteStart: (state) => {
      state.isEventDeleting = true;
      state.error = false;
    },
    fetchEventDeleteSuccess: (state) => {
      state.isEventDeleting = false;
      state.error = false;
    },
    fetchEventDeleteFailure: (state, { payload }) => {
      state.isEventDeleting = false;
      state.error = payload;
    }
  }
});

export const {
  fetchEventCreateStart,
  fetchEventCreateSuccess,
  fetchEventCreateFailure,
  fetchEventSendToVerificationStart,
  fetchEventSendToVerificationSuccess,
  fetchEventSendToVerificationFailure,
  fetchEventDeleteStart,
  fetchEventDeleteSuccess,
  fetchEventDeleteFailure
} = eventSlice.actions;

export default eventSlice.reducer;
