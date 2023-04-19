import axios from 'axios';

const botURL = 'https://clique-mvp-test-bot.herokuapp.com';

// eslint-disable-next-line import/prefer-default-export
export const sendRequestToDownload = async (data) => {
  try {
    const response = await axios.post(`${botURL}/send-file`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
