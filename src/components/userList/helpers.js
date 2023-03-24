export const prepareUserData = (userData) => {
  if (!userData) {
    return null;
  }

  return userData.map((user) => {
    const {
      user_description,
      user_id,
      user_image,
      user_last_name,
      user_name,
      user_telegram_link,
    } = user;

    return {
      id: user_id,
      avatarSrc: user_image,
      firstName: user_name,
      lastName: user_last_name,
      telegramUsername: user_telegram_link,
      description: user_description,
    };
  });
};
