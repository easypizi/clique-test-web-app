import axios from 'axios';

const botURL = 'https://clique-mvp-test-bot.herokuapp.com';

export const sendRequestToDownload = async (data) => {
  try {
    const response = await axios.post(`${botURL}/send-file`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendTinderConnectionMessage = async (data) => {
  try {
    const response = await axios.post(`${botURL}/send-contact`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
