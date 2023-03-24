import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from '../reducers/UsersSlice';
import { fetchUsers } from '../../api';

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersStart());

    try {
      const users = await fetchUsers();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};
