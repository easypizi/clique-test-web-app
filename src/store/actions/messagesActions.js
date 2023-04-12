/* eslint-disable import/prefer-default-export */
import { setActiveFilters } from '../reducers/MessagesSlice';

export const setActiveFiltersAction = (active) => (dispatch) => {
  dispatch(setActiveFilters(active));
};
