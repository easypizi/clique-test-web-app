import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './store/reducers/UsersSlice';
import spaceReducer from './store/reducers/SpaceSlice';
import messagesReducer from './store/reducers/MessagesSlice';
import groupsReducer from './store/reducers/GroupsSlice';
import filesReducer from './store/reducers/FilesSlice';

export default configureStore({
  reducer: {
    user: usersReducer,
    spaces: spaceReducer,
    messages: messagesReducer,
    groups: groupsReducer,
    files: filesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
