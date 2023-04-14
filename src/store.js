import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';
import spaceReducer from './store/reducers/SpaceSlice';
import messagesReducer from './store/reducers/MessagesSlice';
import groupsReducer from './store/reducers/GroupsSlice';

export default configureStore({
  reducer: {
    user: usersReducer,
    spaces: spaceReducer,
    messages: messagesReducer,
    groups: groupsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
