import {
  fetchFileProcessingStart,
  fetchFileProcessingSuccess,
  fetchFileProcessingFailure
  //   fetchFileUploadingStart,
  //   fetchFileUploadingSuccess,
  //   fetchFileUploadingFailure
} from '../reducers/FilesSlice';

export const startProcessingAction = () => (dispatch) => {
  dispatch(fetchFileProcessingStart());
};

export const successProcessingAction = () => (dispatch) => {
  dispatch(fetchFileProcessingSuccess());
};

export const failureProcessingAction = (error) => (dispatch) => {
  dispatch(fetchFileProcessingFailure(error));
};
