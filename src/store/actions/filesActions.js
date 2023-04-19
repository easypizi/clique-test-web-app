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
import { sendRequestToDownload } from '../../api/botApi';

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
