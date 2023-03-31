import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    // spaces: spaceReducer,
    // group: groupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
