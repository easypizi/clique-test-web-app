import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchSpace = (id) => {
  try {
    return axios
      .get(`${baseURL}/space/${id}`)
      .then((response) => response && response.data)
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw Error(error);
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
      throw Error(error);
    }
  }

  return null;
};
