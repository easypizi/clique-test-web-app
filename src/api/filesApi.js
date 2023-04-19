import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

// eslint-disable-next-line import/prefer-default-export
export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-file/${fileId}`);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
