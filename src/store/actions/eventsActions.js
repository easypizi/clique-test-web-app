import {
  fetchEventCreateStart,
  fetchEventCreateSuccess,
  fetchEventCreateFailure,
  fetchEventSendToVerificationStart,
  fetchEventSendToVerificationSuccess,
  fetchEventSendToVerificationFailure,
  fetchEventDeleteStart,
  fetchEventDeleteSuccess,
  fetchEventDeleteFailure,
  setFiltersForEvents,
  resetFiltersForEvents,
  togglePopupVisibility,
  fetchEventAddingToCalendarStart,
  fetchEventAddingToCalendarSuccess,
  fetchEventAddingToCalendarFailure
} from '../reducers/EventsSlice';

import { fetchSpaceSuccess } from '../reducers/SpaceSlice';

import { fetchSpace } from '../../api/spaceApi';
import { createEvent, deleteEvent } from '../../api/eventsApi';
import { sendEventToVerification, addToCalendar } from '../../api/botApi';

export const createNewEventAction = (data) => async (dispatch) => {
  dispatch(fetchEventCreateStart());
  try {
    const result = await createEvent(data);
    if (result) {
      dispatch(fetchEventCreateSuccess());
    }
  } catch (error) {
    dispatch(fetchEventCreateFailure(error));
  }
};

export const sendEventToVerificationAction = (data) => async (dispatch) => {
  dispatch(fetchEventSendToVerificationStart());

  try {
    const result = await sendEventToVerification(data);
    if (result) {
      dispatch(fetchEventSendToVerificationSuccess());
    }
  } catch (error) {
    dispatch(fetchEventSendToVerificationFailure(error));
  }
};

export const deleteEventAction = (id, spaceId) => async (dispatch) => {
  dispatch(fetchEventDeleteStart());
  try {
    const deletedEvent = await deleteEvent(id);
    if (deletedEvent) {
      const space = await fetchSpace(spaceId);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
      dispatch(fetchEventDeleteSuccess());
    }
  } catch (error) {
    dispatch(fetchEventDeleteFailure(error.message));
  }
};

export const addToCalendarAction = (data) => async (dispatch) => {
  dispatch(fetchEventAddingToCalendarStart());
  try {
    const requestToAdddingToCalendar = await addToCalendar(data);
    if (requestToAdddingToCalendar) {
      dispatch(fetchEventAddingToCalendarSuccess());
    }
  } catch (error) {
    dispatch(fetchEventAddingToCalendarFailure(error));
  }
};

export const setEventsFiltersAction = (filters) => (dispatch) => {
  dispatch(setFiltersForEvents(filters));
};

export const resetEventsFiltersAction = () => (dispatch) => {
  dispatch(resetFiltersForEvents());
};

export const togglePopupVisibilityAction = (visibiltyState) => (dispatch) => {
  dispatch(togglePopupVisibility(visibiltyState));
};
