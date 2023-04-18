/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    isProcessingFile: false,
    isUploadingFile: false,
    error: false
  },
  reducers: {
    fetchFileProcessingStart: (state) => {
      state.isProcessingFile = true;
      state.error = null;
    },
    fetchFileProcessingSuccess: (state) => {
      state.isProcessingFile = false;
      state.error = null;
    },
    fetchFileProcessingFailure: (state, { payload }) => {
      state.isProcessingFile = false;
      state.error = payload;
    },
    fetchFileUploadingStart: (state) => {
      state.isUploadingFile = true;
      state.error = null;
    },
    fetchFileUploadingSuccess: (state) => {
      state.isUploadingFile = true;
      state.error = null;
    },
    fetchFileUploadingFailure: (state, { payload }) => {
      state.isUploadingFile = true;
      state.error = payload;
    }
  }
});

export const {
  fetchFileProcessingStart,
  fetchFileProcessingSuccess,
  fetchFileProcessingFailure,
  fetchFileUploadingStart,
  fetchFileUploadingSuccess,
  fetchFileUploadingFailure
} = filesSlice.actions;

export default filesSlice.reducer;
