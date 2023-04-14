import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

// eslint-disable-next-line import/prefer-default-export
export const updateGroup = async (data) => {
  try {
    const response = await axios.patch(`${baseURL}/update-group`, data);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
