import { setActiveFilters } from '../reducers/MessagesSlice';

import {
  fetchSpaceStart,
  fetchSpaceSuccess,
  fetchSpaceFailure
} from '../reducers/SpaceSlice';

import { updateMessage, deleteMessage } from '../../api/messagesApi';
import { fetchSpace } from '../../api/spaceApi';

export const setActiveFiltersAction = (filter) => (dispatch) => {
  dispatch(setActiveFilters(filter));
};

export const deleteMessageAction =
  (groupId, id, spaceId) => async (dispatch) => {
    dispatch(fetchSpaceStart());
    try {
      const deletedMessage = await deleteMessage(groupId, id);
      if (deletedMessage) {
        const space = await fetchSpace(spaceId);
        dispatch(fetchSpaceSuccess({ spaceData: space }));
      }
    } catch (error) {
      dispatch(fetchSpaceFailure(error.message));
    }
  };

export const updateMessageAction = (data, spaceId) => async (dispatch) => {
  dispatch(fetchSpaceStart());
  try {
    const updatedMessage = await updateMessage(data);
    if (updatedMessage) {
      const space = await fetchSpace(spaceId);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
    }
  } catch (error) {
    dispatch(fetchSpaceFailure(error.message));
  }
};
