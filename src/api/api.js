/* eslint-disable no-console */
import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchUsers = () => {
  try {
    axios
      .get(`${baseURL}/users`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    console.error(e);
  }
};

export const fetchSpaces = () => {
  try {
    axios
      .get(`${baseURL}/space`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    console.error(e);
  }
};

export const fetchGroups = () => {
  try {
    axios
      .get(`${baseURL}/groups`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    console.error(e);
  }
};
