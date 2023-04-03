/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchUser = (id) => {
  try {
    return axios
      .get(`${baseURL}/user/${id}`)
      .then((response) => response && response.data && response.data[0])
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw Error(error);
  }
};
