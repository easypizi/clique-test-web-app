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
  togglePopupVisibility
} from '../reducers/EventsSlice';

import { fetchSpaceSuccess } from '../reducers/SpaceSlice';

import { fetchSpace } from '../../api/spaceApi';
import { createEvent, deleteEvent } from '../../api/eventsApi';
import { sendEventToVerification } from '../../api/botApi';

export const createNewEventAction = (data) => async (dispatch) => {
  dispatch(fetchEventCreateStart());
  try {
    const result = await createEvent(data);
    if (result) {
      const space = await fetchSpace(data.event_space_id);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
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

export const setEventsFiltersAction = (filters) => (dispatch) => {
  dispatch(setFiltersForEvents(filters));
};

export const resetEventsFiltersAction = () => (dispatch) => {
  dispatch(resetFiltersForEvents());
};

export const togglePopupVisibilityAction = (visibiltyState) => (dispatch) => {
  dispatch(togglePopupVisibility(visibiltyState));
};
