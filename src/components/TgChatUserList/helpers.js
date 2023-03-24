export default function prepareUserData(userData) {
  if (!userData) {
    return null;
  }

  return userData.map((user) => ({
    id: user.user_description,
    avatarSrc: user.user_image,
    firstName: user.user_name,
    lastName: user.user_last_name,
    telegramUsername: user.user_telegram_link,
    description: user.user_description,
  }));
}
