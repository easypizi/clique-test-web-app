import {
  fetchSpacesStart,
  fetchSpaceSuccess,
  fetchUserSpacesSuccess,
  fetchSpacesFailure,
  fetchSpaceUpdateStart,
  fetchSpaceUpdateSuccess,
  fetchSpaceUpdateFailure
} from '../reducers/SpaceSlice';
import {
  fetchSpace,
  fetchUserSpaces,
  fetchUpdateSpace
} from '../../api/spaceApi';

export const updateSpaceAction = (data) => async (dispatch) => {
  dispatch(fetchSpaceUpdateStart());
  try {
    const updatedSpace = await fetchUpdateSpace(data);
    if (updatedSpace.space_id) {
      const space = await fetchSpace(updatedSpace.space_id);
      dispatch(fetchSpaceUpdateSuccess({ spaceData: space }));
    }
  } catch (error) {
    dispatch(fetchSpaceUpdateFailure(error.message));
  }
};

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
