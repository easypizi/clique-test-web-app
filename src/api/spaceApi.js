import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchSpace = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/space/${id}`);
    return response && response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserSpaces = async (idsArray) => {
  if (idsArray && idsArray.length > 0) {
    const stringIds = idsArray.join(',');
    try {
      const response = await axios.get(`${baseURL}/user-spaces?id=${stringIds}`);
      return response && response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  return null;
};

export const fetchUpdateSpace = async (data) => {
  try {
    const response = await axios.patch(`${baseURL}/update-space`, data);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
