/* eslint-disable import/prefer-default-export */
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from '../reducers/UsersSlice';
import { fetchUsers } from '../../api';

export const getUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());

  try {
    const users = await fetchUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};
