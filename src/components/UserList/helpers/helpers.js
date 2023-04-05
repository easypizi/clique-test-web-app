export default function prepareUserData(userData, spaceOwner) {
  if (!userData) {
    return null;
  }

  return userData.map((user) => ({
    id: user.userId,
    avatarSrc: user.userImage ?? '',
    firstName: user.userName,
    lastName: user.userLastName ?? '',
    telegramUsername: user.userLink,
    description: user.userDescription ?? '',
    isVisible: user.isVisible,
    isSpaceOwner: user.userId === spaceOwner,
    userBadges: user.userBadges,
    userLinks: user.userLinks
  }));
}
