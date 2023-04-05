import {
  fetchSpacesStart,
  fetchSpaceSuccess,
  fetchUserSpacesSuccess,
  fetchSpacesFailure
} from '../reducers/SpaceSlice';
import { fetchSpace, fetchUserSpaces } from '../../api/spaceApi';

export const getUserSpaces = (ids) => async (dispatch) => {
  dispatch(fetchSpacesStart());
  try {
    const spaces = await fetchUserSpaces(ids);
    dispatch(fetchUserSpacesSuccess({ spaces }));
  } catch (error) {
    dispatch(fetchSpacesFailure(error.message));
  }
};

export const getSpace = (id) => async (dispatch) => {
  dispatch(fetchSpacesStart());
  try {
    const space = await fetchSpace(id);
    dispatch(fetchSpaceSuccess({ spaceData: space }));
  } catch (error) {
    dispatch(fetchSpacesFailure(error.message));
  }
};
