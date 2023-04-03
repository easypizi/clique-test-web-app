/* eslint-disable import/prefer-default-export */
import {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure
} from '../reducers/UsersSlice';
import { fetchUser } from '../../api/userApi';

export const getUser = (id, privateId) => async (dispatch) => {
  dispatch(fetchCurrentUserStart());
  try {
    const user = await fetchUser(id);
    dispatch(fetchCurrentUserSuccess({ userData: user, privateId }));
  } catch (error) {
    dispatch(fetchCurrentUserFailure(error.message));
  }
};
