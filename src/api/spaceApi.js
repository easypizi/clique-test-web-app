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

export const fetchUserSpaces = (id) => {
  if (id && id.length > 0) {
    const stringIds = id.join(',');

    try {
      return axios
        .get(`${baseURL}/user-spaces?id=${stringIds}`)
        .then((response) => response && response.data)
        .catch((error) => {
          throw error;
        });
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
