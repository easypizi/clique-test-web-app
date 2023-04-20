import { updateGroup } from '../../api/groupsApi';
import { fetchSpace } from '../../api/spaceApi';

import { fetchSpaceSuccess } from '../reducers/SpaceSlice';

import {
  fetchGroupUpdateStart,
  fetchGroupUpdateFailure,
  fetchGroupUpdateSuccess
} from '../reducers/GroupsSlice';

// eslint-disable-next-line import/prefer-default-export
export const updateGroupData = (groupData, spaceId) => async (dispatch) => {
  dispatch(fetchGroupUpdateStart());
  try {
    const result = await updateGroup(groupData);
    if (result) {
      const space = await fetchSpace(spaceId);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
      dispatch(fetchGroupUpdateSuccess());
    }
  } catch (error) {
    dispatch(fetchGroupUpdateFailure(error.message));
  }
};
