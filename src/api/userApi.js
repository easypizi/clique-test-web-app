import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/user/${id}`);
    return response && response.data && response.data[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.patch(`${baseURL}/update-user`, data);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadNewUserPhoto = async (formData) => {
  try {
    await axios.post(`${baseURL}/upload-photo`, formData);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
