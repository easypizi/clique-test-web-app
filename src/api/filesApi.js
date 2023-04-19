import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-file/${fileId}`);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/upload-file`, data);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
