import {
  fetchFileProcessingStart,
  fetchFileProcessingSuccess,
  fetchFileProcessingFailure,
  resetFilesProcessingState,
  fetchFileUploadingStart,
  fetchFileUploadingSuccess,
  fetchFileUploadingFailure,
  setActiveFileFilters
} from '../reducers/FilesSlice';

import {
  fetchSpacesStart,
  fetchSpaceSuccess,
  fetchSpacesFailure
} from '../reducers/SpaceSlice';

import { fetchSpace } from '../../api/spaceApi';
import { deleteFile, uploadFile } from '../../api/filesApi';
import { sendRequestToDownload } from '../../api/botApi';

export const resetFilesStateAction = () => (dispatch) => {
  dispatch(resetFilesProcessingState());
};

export const setActiveFileFiltersAction = (filters) => (dispatch) => {
  dispatch(setActiveFileFilters(filters));
};

export const uploadFileAction = (data) => async (dispatch) => {
  dispatch(fetchFileUploadingStart());
  try {
    const uploadedFile = await uploadFile(data);
    if (uploadedFile) {
      dispatch(fetchFileUploadingSuccess());
    }
  } catch (error) {
    dispatch(fetchFileUploadingFailure(error));
  }
};

export const sendFileToUserAction = (data) => async (dispatch) => {
  dispatch(fetchFileProcessingStart());
  try {
    const requestToFileSend = await sendRequestToDownload(data);
    if (requestToFileSend) {
      dispatch(fetchFileProcessingSuccess());
    }
  } catch (error) {
    dispatch(fetchFileProcessingFailure(error));
  }
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
