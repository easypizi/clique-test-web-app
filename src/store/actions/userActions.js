import {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchCurrentUserUpdateStart,
  fetchCurrentUserUpdateSuccess,
  fetchCurrentUserUpdateFailure,
  resetUserDataStateUpdate
} from '../reducers/UsersSlice';
import { fetchUser, updateUser, uploadNewUserPhoto } from '../../api/userApi';

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

export const updateUserData = (userData) => async (dispatch) => {
  dispatch(fetchCurrentUserUpdateStart());
  try {
    await updateUser(userData);
    dispatch(fetchCurrentUserUpdateSuccess());
  } catch (error) {
    dispatch(fetchCurrentUserUpdateFailure(error.message));
  }
};

export const resetUserDataUpdate = () => (dispatch) => {
  dispatch(resetUserDataStateUpdate());
};
