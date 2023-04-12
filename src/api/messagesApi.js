import axios from 'axios';

const baseURL = 'https://clique-mvp-backend.herokuapp.com/api';

export const updateMessage = async (data) => {
  try {
    const response = await axios.patch(`${baseURL}/update-message`, data);
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMessage = async (groupId, id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/delete-message/${groupId}/${id}`
    );
    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
