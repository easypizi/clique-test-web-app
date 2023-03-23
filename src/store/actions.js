import axios from 'axios';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ERROR_USERS = 'ERROR_USERS';

export const requestUsers = () => ({
  type: REQUEST_USERS,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const errorUsers = (error) => ({
  type: ERROR_USERS,
  error,
});

export const fetchUsers = () => async (dispatch) => {
  dispatch(requestUsers());

  //TODO: Update after uploading backend to server
  try {
    const response = await axios.get(
      'https://clique-mvp-backend.herokuapp.com/'
    );
    const users = response.data;
    dispatch(receiveUsers(users));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};
