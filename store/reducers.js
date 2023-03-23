import { REQUEST_USERS, RECEIVE_USERS, ERROR_USERS } from './userActions';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        users: action.users,
      };
    case ERROR_USERS:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
