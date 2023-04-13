import { setActiveFilters } from '../reducers/MessagesSlice';

import {
  fetchSpacesStart,
  fetchSpaceSuccess,
  fetchSpacesFailure
} from '../reducers/SpaceSlice';

import { updateMessage, deleteMessage } from '../../api/messagesApi';
import { fetchSpace } from '../../api/spaceApi';

export const setActiveFiltersAction = (filter) => (dispatch) => {
  dispatch(setActiveFilters(filter));
};

export const deleteMessageAction =
  (groupId, id, spaceId) => async (dispatch) => {
    dispatch(fetchSpacesStart());
    try {
      const deletedMessage = await deleteMessage(groupId, id);
      if (deletedMessage) {
        const space = await fetchSpace(spaceId);
        dispatch(fetchSpaceSuccess({ spaceData: space }));
      }
    } catch (error) {
      dispatch(fetchSpacesFailure(error.message));
    }
  };

export const updateMessageAction = (data, spaceId) => async (dispatch) => {
  dispatch(fetchSpacesStart());
  try {
    const updatedMessage = await updateMessage(data);
    if (updatedMessage) {
      const space = await fetchSpace(spaceId);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
    }
  } catch (error) {
    dispatch(fetchSpacesFailure(error.message));
  }
};
