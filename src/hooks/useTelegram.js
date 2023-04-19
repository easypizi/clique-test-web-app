/* eslint-disable import/prefer-default-export */
const tg = window.Telegram.WebApp;

export const useTelegram = () => ({
  tg,
  user: tg.initDataUnsafe?.user
});
