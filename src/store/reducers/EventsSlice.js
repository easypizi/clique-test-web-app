/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    isEventCreating: false,
    isEventVeryficationSending: false,
    isEventVeryficationSent: false,
    isEventDeleting: false,
    isAddingToCalendarInProcess: false,
    isPopupOpened: false,
    isEventPublishing: false,
    isEventsPublished: false,
    eventFilters: {
      isUpcoming: null,
      timeFrom: null,
      timeTo: null,
      isOffline: null,
      tags: []
    },
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
      state.isEventVeryficationSent = false;
      state.error = false;
    },
    fetchEventSendToVerificationSuccess: (state) => {
      state.isEventVeryficationSending = false;
      state.isEventVeryficationSent = true;
      state.error = false;
    },
    fetchEventSendToVerificationFailure: (state, { payload }) => {
      state.isEventVeryficationSending = false;
      state.error = payload;
    },

    resetEventSendToVerificationSending: (state) => {
      state.isEventVeryficationSending = false;
      state.isEventVeryficationSent = false;
      state.error = false;
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
    },

    fetchEventPublishStart: (state) => {
      state.isEventPublishing = true;
      state.isEventsPublished = false;
      state.error = false;
    },
    fetchEventPublishSuccess: (state) => {
      state.isEventPublishing = false;
      state.isEventsPublished = true;
      state.error = false;
    },
    fetchEventPublishFailure: (state, { payload }) => {
      state.isEventPublishing = false;
      state.isEventsPublished = false;
      state.error = payload;
    },

    resetEventPublishing: (state) => {
      state.isEventPublishing = false;
      state.isEventsPublished = false;
      state.error = false;
    },

    togglePopupVisibility: (state, { payload }) => {
      state.isPopupOpened = payload;
    },
    setFiltersForEvents: (state, { payload }) => {
      state.eventFilters = payload;
    },
    resetFiltersForEvents: (state) => {
      state.eventFilters = {
        isUpcoming: null,
        timeFrom: null,
        timeTo: null,
        isOffline: null,
        tags: []
      };
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
  resetEventSendToVerificationSending,

  fetchEventDeleteStart,
  fetchEventDeleteSuccess,
  fetchEventDeleteFailure,

  setFiltersForEvents,
  resetFiltersForEvents,
  togglePopupVisibility,

  fetchEventPublishStart,
  fetchEventPublishSuccess,
  fetchEventPublishFailure,
  resetEventPublishing
} = eventSlice.actions;

export default eventSlice.reducer;
