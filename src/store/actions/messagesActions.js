import { setActiveFilters } from '../reducers/MessagesSlice';

import { updateMessage, deleteMessage } from '../../api/messagesApi';

export const setActiveFiltersAction = (filter) => (dispatch) => {
  dispatch(setActiveFilters(filter));
};

export const deleteMessageAction = async (groupId, id) => {
  await deleteMessage(groupId, id);
};

export const updateMessageAction = async (data) => {
  await updateMessage(data);
};
