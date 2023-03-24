import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchUsers = () => {
  return axios
    .get(`${baseURL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
