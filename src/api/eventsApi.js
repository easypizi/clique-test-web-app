import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const createEvent = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/create-event`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/delete-event/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
