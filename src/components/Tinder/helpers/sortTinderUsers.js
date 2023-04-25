const sortTinderUsers = (users) => {
  if (!users || !users.length) {
    return [];
  }

  function isEmptyObject(obj) {
    return !obj.likes.length && !obj.bans.length && !obj.connected.length;
  }

  function sortByEmptyFieldsFirst(a, b) {
    const aEmpty = isEmptyObject(a);
    const bEmpty = isEmptyObject(b);

    if (aEmpty && !bEmpty) {
      return -1;
    }
    if (!aEmpty && bEmpty) {
      return 1;
    }
    return 0;
  }

  const sortedUsers = users.sort((a, b) => {
    const emptyFieldsFirst = sortByEmptyFieldsFirst(a, b);
    if (emptyFieldsFirst !== 0) {
      return emptyFieldsFirst;
    }
    const compareLastNames = a.userLastName?.localeCompare(b.userLastName);
    if (compareLastNames !== 0) {
      return compareLastNames;
    }
    return a.userName?.localeCompare(b.userName);
  });

  return sortedUsers;
};

export default sortTinderUsers;
