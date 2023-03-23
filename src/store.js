import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './store/reducers';

const loggerMiddleware = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, loggerMiddleware],
});

export default store;
