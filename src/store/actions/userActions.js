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

// TODO: make current user updateble
export const updateUserData = (user) => async (dispatch) => {
  dispatch(user);
};
