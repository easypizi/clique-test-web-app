import {
  fetchFileProcessingStart,
  fetchFileProcessingSuccess,
  fetchFileProcessingFailure
  //   fetchFileUploadingStart,
  //   fetchFileUploadingSuccess,
  //   fetchFileUploadingFailure
} from '../reducers/FilesSlice';

import {
  fetchSpacesStart,
  fetchSpaceSuccess,
  fetchSpacesFailure
} from '../reducers/SpaceSlice';

import { fetchSpace } from '../../api/spaceApi';
import { deleteFile } from '../../api/filesApi';

export const startProcessingAction = () => (dispatch) => {
  dispatch(fetchFileProcessingStart());
};

export const successProcessingAction = () => (dispatch) => {
  dispatch(fetchFileProcessingSuccess());
};

export const failureProcessingAction = (error) => (dispatch) => {
  dispatch(fetchFileProcessingFailure(error));
};

export const deleteFileAction = (fileId, spaceId) => async (dispatch) => {
  dispatch(fetchSpacesStart());
  try {
    const deletedMessage = await deleteFile(fileId);
    if (deletedMessage) {
      const space = await fetchSpace(spaceId);
      dispatch(fetchSpaceSuccess({ spaceData: space }));
    }
  } catch (error) {
    dispatch(fetchSpacesFailure(error.message));
  }
};
