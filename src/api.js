import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchUsers = () =>
  axios
    .get(`${baseURL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const fetchSpaces = () =>
  axios
    .get(`${baseURL}/space`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const fetchGroups = () =>
  axios
    .get(`${baseURL}/groups`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
