import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';
import spaceReducer from './store/reducers/SpaceSlice';
import messagesReducer from './store/reducers/MessagesSlice';

export default configureStore({
  reducer: {
    currentUser: usersReducer,
    spaces: spaceReducer,
    messages: messagesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
