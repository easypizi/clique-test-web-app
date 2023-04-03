import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';
import spaceReducer from './store/reducers/SpaceSlice';

export default configureStore({
  reducer: {
    currentUser: usersReducer,
    spaces: spaceReducer
    // group: groupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
