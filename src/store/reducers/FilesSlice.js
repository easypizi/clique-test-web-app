/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    isProcessingFile: false,
    isFileSent: false,
    isUploadingFile: false,
    error: false,
    activeFileFilters: []
  },
  reducers: {
    setActiveFileFilters: (state, { payload }) => {
      state.activeFileFilters = payload;
    },
    resetFilesProcessingState: (state) => {
      state.isProcessingFile = false;
      state.isFileSent = false;
      state.isUploadingFile = false;
      state.error = null;
    },
    fetchFileProcessingStart: (state) => {
      state.isProcessingFile = true;
      state.isFileSent = false;
      state.error = null;
    },
    fetchFileProcessingSuccess: (state) => {
      state.isProcessingFile = false;
      state.isFileSent = true;
      state.error = null;
    },
    fetchFileProcessingFailure: (state, { payload }) => {
      state.isProcessingFile = false;
      state.isFileSent = false;
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
  resetFilesProcessingState,
  fetchFileUploadingStart,
  fetchFileUploadingSuccess,
  fetchFileUploadingFailure,
  setActiveFileFilters
} = filesSlice.actions;

export default filesSlice.reducer;
