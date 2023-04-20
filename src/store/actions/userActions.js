import {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchCurrentUserUpdateStart,
  fetchCurrentUserUpdateSuccess,
  fetchCurrentUserUpdateFailure,
  resetCurrentUserUpdateStates
} from '../reducers/UsersSlice';

import {
  fetchSpaceStart,
  fetchSpaceSuccess,
  fetchSpaceFailure
} from '../reducers/SpaceSlice';

import { fetchUser, updateUser, uploadNewUserPhoto } from '../../api/userApi';
import { fetchSpace } from '../../api/spaceApi';

export const uploadNewUserPhotoAction = (formData) => async (dispatch) => {
  dispatch(fetchCurrentUserUpdateStart());
  try {
    await uploadNewUserPhoto(formData);
    dispatch(fetchCurrentUserUpdateSuccess());
  } catch (error) {
    dispatch(fetchCurrentUserUpdateFailure(error.message));
  }
};

export const getUser = (id, privateId) => async (dispatch) => {
  dispatch(fetchCurrentUserStart());
  try {
    const user = await fetchUser(id);
    dispatch(fetchCurrentUserSuccess({ userData: user, privateId }));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error.message));
  }
};

export const updateCurrentUserData = (userData) => async (dispatch) => {
  dispatch(fetchCurrentUserUpdateStart());
  try {
    await updateUser(userData);
    dispatch(fetchCurrentUserUpdateSuccess());
  } catch (error) {
    dispatch(fetchCurrentUserUpdateFailure(error.message));
  }
};

export const updateSpaceUserAction =
  (userData, spaceId) => async (dispatch) => {
    dispatch(fetchSpaceStart());
    try {
      const result = await updateUser(userData);
      if (result) {
        const space = await fetchSpace(spaceId);
        dispatch(fetchSpaceSuccess({ spaceData: space }));
      }
    } catch (error) {
      dispatch(fetchSpaceFailure(error.message));
    }
  };

export const resetUserDataUpdate = () => (dispatch) => {
  dispatch(resetCurrentUserUpdateStates());
};
