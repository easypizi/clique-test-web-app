import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
