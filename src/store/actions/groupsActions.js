import { updateGroup } from '../../api/groupsApi';

import {
  fetchGroupUpdateStart,
  fetchGroupUpdateFailure,
  fetchGroupUpdateSuccess
} from '../reducers/GroupsSlice';

// eslint-disable-next-line import/prefer-default-export
export const updateGroupData = (groupData) => async (dispatch) => {
  dispatch(fetchGroupUpdateStart());
  try {
    await updateGroup(groupData);
    dispatch(fetchGroupUpdateSuccess());
  } catch (error) {
    dispatch(fetchGroupUpdateFailure(error.message));
  }
};
